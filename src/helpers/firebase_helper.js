import firebase from 'firebase/compat/app'

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";


class FirebaseAuthBackend {

  constructor(firebaseConfig) {
    
  
  
    if (firebaseConfig) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          localStorage.setItem("profile", JSON.stringify(user));
        } else {
          localStorage.removeItem("profile");
        }
      });
    }
  }



  /**
   * Registers the user with given details
   */
  registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Registers the user with given details
   */
  editProfileAPI = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Login user with given details
   */
  loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * forget Password user with given details
   */
  forgetPassword = email => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email, {
          url:
            window.location.protocol + "//" + window.location.host + "/login",
        })
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Logout the user
   */
  logout = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Social Login user with given details
   */
  socialLoginUser = (data, type) => {
    let credential = {};
    if (type === "google") {
      credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.token);
    } else if (type === "facebook") {
      credential = firebase.auth.FacebookAuthProvider.credential(data.token);
    }
    return new Promise((resolve, reject) => {
      if (!!credential) {
        firebase.auth().signInWithCredential(credential)
          .then(user => {
            resolve(this.addNewUserToFirestore(user));
          })
          .catch(error => {
            reject(this._handleError(error));
          });
      } else {
        reject(this._handleError(error));
      }
    });
  };

  addNewUserToFirestore = (user) => {
    const collection = firebase.firestore().collection("users");
    const { profile } = user.additionalUserInfo;
    const details = {
      firstName: profile.given_name ? profile.given_name : profile.first_name,
      lastName: profile.family_name ? profile.family_name : profile.last_name,
      fullName: profile.name,
      email: profile.email,
      picture: profile.picture,
      createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
    };
    collection.doc(firebase.auth().currentUser.uid).set(details);
    return { user, details };
  };

  setLoggeedInUser = user => {
    localStorage.setItem("profile", JSON.stringify(user));
  };


  getChats = () => {
    return async (dispatch) => {

      dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

      const db = firestore();
      const unsubscribe = db.collection("chat")
      //.where("uid", "!=", uid)
      .onSnapshot((querySnapshot) => {
          const users = [];
          querySnapshot.forEach(function(doc) {
              if(doc.data().uid != uid){
                  users.push(doc.data());
              }
          });
          //console.log(users);

          dispatch({ 
              type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
              payload: { users }
          });

      });

      return unsubscribe;

  }

   }



  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = () => {
    if (!localStorage.getItem("profile")) return null;
    return JSON.parse(localStorage.getItem("profile"));
  };

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage;
  }
}

let _fireBaseBackend = null;

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = config => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
  return _fireBaseBackend;
};

const firebaseConfig = {
  apiKey: "AIzaSyB-XYZYtlxQDdQL_wjlrLh8zYvDaaCHUT4",
  authDomain: "flipx-1c632.firebaseapp.com",
  databaseURL: "https://flipx-1c632-default-rtdb.firebaseio.com",
  projectId: "flipx-1c632",
  storageBucket: "flipx-1c632.appspot.com",
  messagingSenderId: "532065542231",
  appId: "1:532065542231:web:5f40f3f139e9559f58c312",
  measurementId: "G-M6D35111GZ"
 }

//  config  = new FirebaseAuthBackend(firebaseConfig);

export { initFirebaseBackend, getFirebaseBackend };
