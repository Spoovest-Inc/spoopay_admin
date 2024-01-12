import { call, put, takeEvery } from "redux-saga/effects"
import { ToastContainer, toast } from 'react-toastify';

// Crypto Redux States
import { GET_USERS, GET_USER_PROFILE , ADD_NEW_USER , DELETE_USER, UPDATE_USER, SUSPEND_USER, ACTIVATE_USER } from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
  suspendUserSuccess,
  suspendUserFail,
  activateUserSuccess,
  activateUserFail
} from "./actions"

//Include Both Helper File with needed methods
import { getUsers, getUserProfile , addNewUser, updateUser ,deleteUser, suspendUser, activateUser} from "../../helpers/backend_helper"

function* fetchUsers() {
  try {
    const response = yield call(getUsers)
    yield put(getUsersSuccess(response))
  } catch (error) {
    yield put(getUsersFail(error))
  }
}

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile)
    yield put(getUserProfileSuccess(response))
  } catch (error) {
    yield put(getUserProfileFail(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user)
    toast("User updated successfully")
    window.location.reload(false); 
    yield put(updateUserSuccess(response))
  } catch (error) {
    yield put(updateUserFail(error.response.data.message))
    toast("Oops! Something went wrong")
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user)
    yield put(deleteUserSuccess(response))
    window.location.reload(false); 
  } catch (error) {
    yield put(deleteUserFail(error))
  }
}

function* onAddNewUser({ payload: user }) {

  try {
    const response = yield call(addNewUser, user)
    window.location.reload(false); 
    yield put(addUserSuccess(response))
  } catch (error) {

    yield put(addUserFail(error))
  }
}

function* onSuspendUser({ payload: user }) {
  try {
    const response = yield call(suspendUser, user)
    toast("User suspended")
    yield put(suspendUserSuccess(response))
    window.location.reload(false); 
  } catch (error) {
    yield put(suspendUserFail(error))
    toast('oops, something went wrong', error.response.data.message)
  }
}

function* onActivateUser({ payload: user }) {
  try {
    const response = yield call(activateUser, user)
    toast("User actiavted successfully")
    yield put(activateUserSuccess(response))
    window.location.reload(false); 
  } catch (error) {
    yield put(activateUserFail(error))
    toast('oops, something went wrong', error.response.data.message)
  }
}

function* fetchUserDetails({ payload: id}) {
  try {
    const response = yield call(getUserProfile, id)
    yield put(getUserProfileSuccess(response))
  } catch (error) {
    yield put(getUserProfileFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
  yield takeEvery(SUSPEND_USER, onSuspendUser)
  yield takeEvery(ACTIVATE_USER, onActivateUser)
  yield takeEvery(GET_USER_PROFILE, fetchUserDetails)
}

export default contactsSaga;
