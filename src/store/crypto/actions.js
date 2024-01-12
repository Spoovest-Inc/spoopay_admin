import {
  GET_WALLET,
  GET_WALLET_FAIL,
  GET_WALLET_SUCCESS,
  GET_CRYPTO_ORDERS,
  GET_CRYPTO_ORDERS_FAIL,
  GET_CRYPTO_ORDERS_SUCCESS,

  UPDATE_WALLET_SUCCESS,
  UPDATE_WALLET_FAIL,
  UPDATE_WALLET
} from "./actionTypes"

export const getWallet = () => ({
  type: GET_WALLET,
})

export const getWalletSuccess = wallets => ({
  type: GET_WALLET_SUCCESS,
  payload: wallets,
})

export const getWalletFail = error => ({
  type: GET_WALLET_FAIL,
  payload: error,
})

export const getCryptoOrders = () => ({
  type: GET_CRYPTO_ORDERS,
})

export const getCryptoOrdersSuccess = orders => ({
  type: GET_CRYPTO_ORDERS_SUCCESS,
  payload: orders,
})

export const getCryptoOrdersFail = error => ({
  type: GET_CRYPTO_ORDERS_FAIL,
  payload: error,
})

export const updateWallet = payload => ({
    type: UPDATE_WALLET,
    payload: payload,

})

export const updateWalletSuccess = payload => ({  type: UPDATE_WALLET_SUCCESS, payload: payload })
export const updateWalletFail = error => ({ type: UPDATE_WALLET_FAIL, payload: error })
