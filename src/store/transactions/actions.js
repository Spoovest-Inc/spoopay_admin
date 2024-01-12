
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,

  GET_PENDING_TRANSACTIONS,
  GET_PENDING_TRANSACTIONS_SUCCESS,
  APPROVE_TRANSACTION,
  APPROVE_TRANSACTIONS_FAIL,
  APPROVE_TRANSACTIONS_SUCCESS
} from "./actionTypes"

export const onGetTransactions = () => ({
  type: GET_TRANSACTIONS,
})

export const onGetPendingTransactions = () => ({ 
   type: GET_PENDING_TRANSACTIONS,
})


export const getPendingTransactionsSuccess = transactions => ({
    type: GET_PENDING_TRANSACTIONS_SUCCESS,
    payload: transactions
})

export const getTransactionsSuccess = transactions => ({
  type: GET_TRANSACTIONS_SUCCESS,
  payload: transactions
})

export const getTransactionsFail = errors => ({
  type: GET_TRANSACTIONS_FAIL,
  payload: errors
})

export const approveTransactions = id => ({
  type: APPROVE_TRANSACTION,
  payload: id
 })








