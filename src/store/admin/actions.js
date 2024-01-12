import { CLOSE_ADMIN_BATCH } from "helpers/url_helper"
import {
  GET_ADMINS_SUCCESS,
  GET_ADMINS_FAIL,
  GET_ADMINS,
  CLOSE_ADMIN_BATCH_SUCCESS,
  CLOSE_ADMIN_BATCH_FAIL,

  ADD_NEW_ADMIN,
  ADD_ADMIN_FAIL,
  ADD_ADMIN_SUCCESS,

  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,

  UPDATE_ADMIN,
  UPDATE_ADMIN_FAIL,
  UPDATE_ADMIN_SUCCESS,

  ADD_NEW_AD,
  ADD_NEW_AD_FAIL,
  ADD_NEW_AD_SUCCESS,

  GET_LOGS,
  GET_LOG_FAIL,
  GET_LOG_SUCCESS

  

} from "./actionTypes"

export const getAdmins = () => ({
  type: GET_ADMINS,
})

export const getAdminsSuccess = admins => ({
  type: GET_ADMINS_SUCCESS,
  payload: admins,
})

export const getAdminsFail = error => ({
  type: GET_ADMINS_FAIL,
  payload: error,
})

export const closeAdminBatch = admin => ({
  type: CLOSE_ADMIN_BATCH,
  payload: admin
})

export const closeAdminBatchSuccess = admin => ({
  type: CLOSE_ADMIN_BATCH_SUCCESS,
  payload: admin,
})

export const closeAdminBatchFail = error => ({
  type: CLOSE_ADMIN_BATCH_FAIL,
  payload: error
})


export const addNewAdmin = user => ({
  type: ADD_NEW_ADMIN,
  payload: user,
})

export const addUserSuccess = user => ({
  type: ADD_ADMIN_SUCCESS,
  payload: user,
})

export const addUserFail = error => ({
  type: ADD_ADMIN_FAIL,
  payload: error,
})

export const deleteUser = admin => ({
  type: DELETE_USER,
  payload: admin,
})

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})

export const deleteUserSuccess = admin => ({
  type: DELETE_USER_SUCCESS,
  payload: admin,
})

export const updateUser = admin => ({
  type: UPDATE_ADMIN,
  payload: admin,
})

export const onUpdateAdminSuccess = admin => ({
  type: UPDATE_ADMIN_SUCCESS,
  payload: admin
})

export const onUpdateAdminFailure = admin => ({
  type: UPDATE_ADMIN_FAIL,
  payload: admin
})

export const getLogs = () => ({
  type: GET_LOGS
})

export const logSuccess = logs => ({
  type: GET_LOG_SUCCESS,
  payload: logs
})

