import { call, put, takeEvery } from "redux-saga/effects"
import { ToastContainer, toast } from 'react-toastify';
// Crypto Redux States
import { GET_ADMINS,  CLOSE_ADMIN_BATCH, ADD_NEW_ADMIN, DELETE_USER, GET_LOGS } from "./actionTypes"

import {
  getAdminsSuccess,
  getAdminsFail,
  closeAdminBatchFail,
  closeAdminBatchSuccess,
  addUserSuccess,
  addUserFail,
  deleteUserSuccess,
  deleteUserFail,
  logSuccess
} from "./actions"

//Include Both Helper File with needed methods
import { getAdmins, clodeAdminBatchAPI, addNewAdmin, deleteUser, getLogs } from "../../helpers/backend_helper"

function* fetchAdmins() {
  try {
    const response = yield call(getAdmins)
    yield put(getAdminsSuccess(response))
  } catch (error) {
    yield put(getAdminsFail(error))
    if(error.response.data.status === 403){
      toast("Your session has expired !")
      localStorage.removeItem("profile")
      
    }
  }
}

function* onAddNewUser({ payload: admin }) {
  try {
    const response = yield call(addNewAdmin, admin)
    yield put(addUserSuccess(response))
    toast("Admin added successfully")
    window.location.reload(false); 
  } catch (error) {
    yield put(addUserFail(error.response.data.message))
    toast(error.response.data.message)
  }
}

function* onDeleteUser({ payload: admin }) {
  try {
    const response = yield call(deleteUser, admin)
    toast("Admin deleted successfully")
    yield put(deleteUserSuccess(response))
    window.location.reload(false); 
  } catch (error) {
    yield put(deleteUserFail(error))
    toast("oops something went wrong", error.response.data.message)
  }
}

function* fetchLogs() {
  try {
    const response = yield call(getLogs)
    yield put(logSuccess(response))
  } catch (error) {
    
  }
}


function* adminSaga() {
  yield takeEvery(GET_ADMINS, fetchAdmins)
  yield takeEvery(ADD_NEW_ADMIN, onAddNewUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
  yield takeEvery(GET_LOGS, fetchLogs)
}

export default adminSaga;
