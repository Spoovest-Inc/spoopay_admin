import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_WALLET, GET_CRYPTO_ORDERS, UPDATE_WALLET } from "./actionTypes"
import {
  getWalletSuccess,
  getWalletFail,
  getCryptoOrdersSuccess,
  getCryptoOrdersFail,
  updateWalletSuccess,
  updateWalletFail
} from "./actions"

//Include Both Helper File with needed methods
import { getWallet, getCryptoOrder, updateWallet } from "helpers/backend_helper"

function* fetchWallet() {
  try {
    const response = yield call(getWallet)
    yield put(getWalletSuccess(response))
  } catch (error) {
    yield put(getWalletFail(error))
  }
}

function* fetchCrypto() {
  try {
    const response = yield call(getCryptoOrder)
    yield put(getCryptoOrdersSuccess(response))
  } catch (error) {
    yield put(getCryptoOrdersFail(error))
  }
}

function* onUpdateWallet({payload: payload}){
  try {
    const response = yield call(updateWallet, payload)
    yield put(updateWalletSuccess(response))
  } catch (error) {
    yield put(updateWalletFail(error))
  }
}

function* cryptoSaga() {
  yield takeEvery(GET_WALLET, fetchWallet)
  yield takeEvery(GET_CRYPTO_ORDERS, fetchCrypto)
  yield takeEvery(UPDATE_WALLET, onUpdateWallet)
}

export default cryptoSaga
