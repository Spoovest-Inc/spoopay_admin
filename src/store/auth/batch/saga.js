import { call, put, putResolve, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from 'react-toastify';
// Login Redux States
import { CREATE_BATCH, FETCH_TODAY_BATCH} from "./actionTypes";
import { batchSuccess, batchError } from "./actions";

//Include Both Helper File with needed methods
import { createBatchAPI } from "../../../helpers/auth_backend_helper";
import {   fetchTodayBatch } from "../../../helpers/backend_helper";


function* createBatch({ payload: { batch, history } }) {
  try {
    const response = yield call(createBatchAPI, {
      creator_name: batch.creator_name,
      creator_email: batch.creator_email,
      creator_phone_number: batch.creator_phone_number,
      admin_id: batch.admin_id,
    });

    // check if batch has been created 
    if(response){
      yield put(batchSuccess(response));
      history.push("/open-batch");
      toast("Batch created successfully!")
    }
  
  
  } catch (error) {
    let newError = error.response.data.message
    yield put(apiError(newError)); 
    history.push("/waiting");
    toast("oops something went wrong, try again!")
  }
}

function* fetchBatch({payload: {history} }){
  try {
    const response = yield call(fetchTodayBatch)
    if(response){
      localStorage.setItem("todayBatch", JSON.stringify(response));
      history.push("/dashboard")
    }
  } catch (error) {
    let newError = error.response.data.message
    yield put(apiError(newError)); 
    console.log(newError)
    history.push("/waiting");
  }
}




function* batchSaga() {
  yield takeLatest(CREATE_BATCH, createBatch);
  yield takeLatest(FETCH_TODAY_BATCH, fetchBatch);
}

export default batchSaga;
