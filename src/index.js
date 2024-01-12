import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"
import { ToastContainer } from 'react-toastify';
import firebase from 'firebase/compat/app'

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyBF8co3-j6lq7qGI9b8s0U1YYEIwqXb4_0",
  // authDomain: "web-messenger-4eb99.firebaseapp.com",
  // databaseURL: "https://web-messenger-4eb99.firebaseio.com",
  // projectId: "web-messenger-4eb99",
  // storageBucket: "web-messenger-4eb99.appspot.com",
  // messagingSenderId: "252569616509",
  // appId: "1:252569616509:web:2bbb4c394e9d608f147114",
  // measurementId: "G-VXYE76S2G7"

  apiKey: "AIzaSyB-XYZYtlxQDdQL_wjlrLh8zYvDaaCHUT4",
  authDomain: "flipx-1c632.firebaseapp.com",
  databaseURL: "https://flipx-1c632-default-rtdb.firebaseio.com",
  projectId: "flipx-1c632",
  storageBucket: "flipx-1c632.appspot.com",
  messagingSenderId: "532065542231",
  appId: "1:532065542231:web:5f40f3f139e9559f58c312",
  measurementId: "G-M6D35111GZ"
};

firebase.initializeApp(firebaseConfig);

import store from "./store"

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()
