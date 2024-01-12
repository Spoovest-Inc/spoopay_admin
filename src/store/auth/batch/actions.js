import {CREATE_BATCH, CREATE_BATCH_SUCCESS, CREATE_BATCH_FAIL, FETCH_TODAY_BATCH } from "./actionTypes"

export const createBatch = (batch, history) => {
  return {
    type: CREATE_BATCH,
    payload: { batch, history},
  }
}

export const batchSuccess = msg => {
  return {
    type: CREATE_BATCH_SUCCESS,
    payload: msg,
  }
}

export const batchError = error => {
  return {
    type: CREATE_BATCH_FAIL,
    payload: error,
  }
}

export const fetchBatch = (batch,history) => {
  return {
     type: FETCH_TODAY_BATCH,
     payload: { batch, history }
  }
}


