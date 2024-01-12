import { call, put, takeEvery } from "redux-saga/effects"
import { ToastContainer, toast } from 'react-toastify';

// Crypto Redux States
import {GET_TRANSACTIONS, APPROVE_TRANSACTION, GET_PENDING_TRANSACTIONS } from "./actionTypes"

import {
  getTransactionsSuccess,
  getTransactionsFail,
  getPendingTransactionsSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import { getTransactions, approveTransaction, getPendingTransactions } from "../../helpers/backend_helper"
import { take } from "lodash";

function* fetchTransactions() {
  try {
    const response = yield call(getTransactions)
    yield put(getTransactionsSuccess(response))
  } catch (error) {
    yield put(getTransactionsFail(error))
  }
}


function* fetchPendingTransactions() {
    try {
      const response = yield call(getPendingTransactions)
        yield put(getPendingTransactionsSuccess(response))
    } catch (error) {
      
    }
}

function* approveTransactions({ payload: id}){
  try {
    const response = yield call(approveTransaction, id)
    toast("Transaction approved")
  } catch (error) {
    toast(error.message)
  }
}

function* transactionSaga() {
  yield takeEvery(GET_TRANSACTIONS, fetchTransactions)
  yield takeEvery(APPROVE_TRANSACTION, approveTransactions)
  yield takeEvery(GET_PENDING_TRANSACTIONS, fetchPendingTransactions)
}

export default transactionSaga;
