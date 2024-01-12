import {
  GET_WALLET_FAIL,
  GET_WALLET_SUCCESS,
  GET_CRYPTO_ORDERS_SUCCESS,
  GET_CRYPTO_ORDERS_FAIL,
  UPDATE_WALLET_SUCCESS,
  UPDATE_WALLET_FAIL
} from "./actionTypes"

const INIT_STATE = {
  cryptos: [],
  orders: [],
}

const Crypto = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_WALLET_SUCCESS:
      return {
        ...state,
        cryptos: action.payload,
      }

    case GET_WALLET_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CRYPTO_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      }

    case GET_CRYPTO_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

      case UPDATE_WALLET_SUCCESS:
        return {
          ...state,
          cryptos: state.wallets.map(crypto =>
            crypto.id.toString() === action.payload.id.toString()
              ? { crypto, ...action.payload }
              : crypto
          ),
        }
  
      case UPDATE_WALLET_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    default:
      return state
  }
}

export default Crypto
