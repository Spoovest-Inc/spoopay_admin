import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  SUSPEND_USER,
  SUSPEND_USER_SUCCESS,
  SUSPEND_USER_FAIL,
  ACTIVATE_USER,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_FAIL,
} from "./actionTypes"

export const getUsers = () => ({
  type: GET_USERS,
})

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users,
})

export const addNewUser = user => ({
  type: ADD_NEW_USER,
  payload: user,
})

export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: user,
})

export const addUserFail = error => ({
  type: ADD_USER_FAIL,
  payload: error,
})

export const getUsersFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
})

export const getUserProfile = id => ({
  type: GET_USER_PROFILE,
  payload: id,
})

export const getUserProfileSuccess = userProfile => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: userProfile,
})

export const getUserProfileFail = error => ({
  type: GET_USER_PROFILE_FAIL,
  payload: error,
})

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
})

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
})

export const updateUserFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error,
})

export const deleteUser = user => ({
  type: DELETE_USER,
  payload: user,
})

export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
})

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})

export const suspendUser = user => ({
  type: SUSPEND_USER,
  payload: user,
})

export const suspendUserSuccess = user => ({
  type: SUSPEND_USER_SUCCESS,
  payload: user,
})

export const suspendUserFail = error => ({
  type: SUSPEND_USER_FAIL,
  payload: error
})

export const activateUser = user => ({
  type: ACTIVATE_USER,
  payload: user
})

export const activateUserSuccess = user => ({
  type: ACTIVATE_USER_SUCCESS,
  payload: user
})

export const activateUserFail = error => ({
  type: ACTIVATE_USER_FAIL,
  payload: error
})


