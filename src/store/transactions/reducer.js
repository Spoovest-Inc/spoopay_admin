import {
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  GET_PENDING_TRANSACTIONS_SUCCESS
} from "./actionTypes"

const INIT_STATE = {
  transactions: [],
  pendingTransactions: [],
  error: {},
  loading: false,
}

const transactions = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      }

    case GET_PENDING_TRANSACTIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          pendingTransactions: action.payload

        }

    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      }


    default:
      return state
  }
}

export default transactions
