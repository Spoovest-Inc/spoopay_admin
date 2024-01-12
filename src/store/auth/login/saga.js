import { call, put, putResolve, takeEvery, takeLatest } from "redux-saga/effects";
import { ToastContainer, toast } from 'react-toastify';
// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { postFakeLogin } from "../../../helpers/auth_backend_helper";
import {   fetchTodayBatch } from "../../../helpers/backend_helper";


function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postFakeLogin, {
      email: user.email,
      password: user.password,
    });
    
    if(response.code === 200){
      localStorage.setItem("profile", JSON.stringify(response));
      yield put(loginSuccess(response));
      history.push("/dashboard");
    }
    if(response.code === 203){
      localStorage.setItem("profile", JSON.stringify(response));
      yield put(loginSuccess(response));
      console.log(response.code)
      toast("Batch closed, contact admin")
      history.push("/waiting");

    }
    if(response.code === 206){
      localStorage.setItem("profile", JSON.stringify(response));
      yield put(loginSuccess(response));
      history.push("/change-password");
    }
     if(response.code === 201){
      localStorage.setItem("profile", JSON.stringify(response));
      yield put(loginSuccess(response));
      history.push("/verify-token");
    }



  } catch (error) {
    let newError = error.response.data.message
    yield put(apiError(newError)); 
    history.push("/login");
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("profile");
    localStorage.removeItem("batch");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}


function* authSaga() {
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
