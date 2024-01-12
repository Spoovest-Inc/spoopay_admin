import {
    GET_GIFT_CARDS_SUCCESS,
    GET_GIFT_CARDS_FAIL,

    GET_GIFTCARDS_CATEGORIES_SUCCESS,
    GET_GIFTCARDS_CATEGORIES_FAIL,

    ADD_GIFT_CARD_SUCCESS,
    ADD_GIFT_CARD_FAIL,

    UPDATE_GIFTCARD_SUCCESS,
    UPDATE_GIFTCARD_FAIL,

    DELETE_GIFTCARD_SUCCESS,
    DELETE_GIFTCARD_FAIL

  } from "./actionTypes"
  
  const INIT_STATE = {
    giftcards: [],
    cardCategories: [],
    error: {},
    loading: false,
  }
  
  const giftcards = (state = INIT_STATE, action) => {
    switch (action.type) {

      case GET_GIFT_CARDS_SUCCESS:
        return {
          ...state,
          loading: false,
          giftcards: action.payload,
        }
  
      case GET_GIFT_CARDS_FAIL:
        return {
          ...state,
          error: action.payload,
        }

      case GET_GIFTCARDS_CATEGORIES_SUCCESS:
        return {
          ...state,
          cardCategories: action.payload
        }

      case GET_GIFTCARDS_CATEGORIES_FAIL:
        return {
          ...state,
          error: action.payload
        }

      case ADD_GIFT_CARD_SUCCESS:
        return {
          ...state,
          giftcards: [ ...state.giftcards, action.payload],
        }

      case ADD_GIFT_CARD_FAIL:
        return {
          ...state,
          error: action.payload
        }

      case UPDATE_GIFTCARD_SUCCESS:
        return {
          ...state,
          giftcards: [ ...state.giftcards, action.payload],
        }
      
      case UPDATE_GIFTCARD_FAIL:
        return {
          ...state,
          error: action.payload
        }

      case DELETE_GIFTCARD_SUCCESS:
        return {
          ...state,
          giftcards: [ ...state.giftcards, action.payload],
        }

      case DELETE_GIFTCARD_FAIL:
        return {
          ...state,
          error: action.payload
        }

  
      default:
        return state
    }
  }
  
  export default giftcards
  