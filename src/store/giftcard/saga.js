import { call, put, takeEvery } from "redux-saga/effects"
import { ToastContainer, toast } from 'react-toastify';

// Crypto Redux States
import { GET_GIFT_CARDS, ADD_GIFT_CARD, GET_GIFTCARDS_CATEGORIES, UPDATE_GIFTCARD, DELETE_GIFTCARD, UPDATE_GIFTCARD_CATEGORY} from "./actionTypes"

import {
 getGiftCardsSuccess,
 getGiftCardsFail,

 addGiftCardSuccess,
 addGiftCardFail,

 getGiftCardsCategoriesSuccess,
 getGiftCardsCategoriesFail,

 updateGiftCardSuccess,
 updateGiftCardFail,

 deleteCardSuccess,
 deleteCardFail,


} from "./actions"

//Include Both Helper File with needed methods
import { getGiftCards, addGiftCard, giftcardCategories, updateGiftCard, deleteCard, updateGiftCardCategory } from "../../helpers/backend_helper"


function* fetchGiftCards() {
  try {
    const response = yield call(getGiftCards)
    yield put(getGiftCardsSuccess(response))
  } catch (error) {
    yield put(getGiftCardsFail(error))
  }
}

function* onAddGiftCard({payload: formData}){
    try {
        const res = yield call(addGiftCard({formData}))
        yield put(addGiftCardSuccess(res))
        window.location.reload(false); 
    } catch (error) {
        yield put(addGiftCardFail(error.response.data.message))
        toast(error.response.data.message)
    }
}

function* onGetCardCategories({payload: id}){
    try {
        const response = yield call(giftcardCategories, id)
        yield put(getGiftCardsCategoriesSuccess(response))
    } catch (error) {
        yield put(getGiftCardsCategoriesFail(error.response.data.message))
        toast(error.response.data.message)
    }
}

function* onUpdateGiftCard({payload: giftcards}){
    try {
      const response = yield call(updateGiftCard(giftcards))
      yield put(updateGiftCardSuccess(response))
      toast("Card updated successfully")
      window.location.reload(false); 
    } catch (error) {
      yield put(updateGiftCardFail(error.response.data.message))
      toast(error.response.data.message)
    }
}

function* onUpdateGiftCardCategory({payload: data}){
  try {
    const response = yield call(updateGiftCardCategory, data)
    // yield put(updateGiftCardSuccess(response))
    toast("Card category updated successfully")
    window.location.reload(false); 
  } catch (error) {
    // yield put(updateGiftCardFail(error.response.data.message))
    toast(error.response.data.message)
  }
}

function* onDeleteCard({payload: giftcard}){
  try {
    const response = yield call(deleteCard,giftcard)
    toast("Card has been deleted successfully")
    window.location.reload(false); 
    yield put(deleteCardSuccess(response))
  } catch (error) {
    yield put(deleteCardFail(error.response.data.message))
    toast(error.response.data.message)
  }
}



function* giftcardSaga() {
  yield takeEvery(GET_GIFT_CARDS, fetchGiftCards)
  yield takeEvery(ADD_GIFT_CARD, onAddGiftCard)
  yield takeEvery(GET_GIFTCARDS_CATEGORIES, onGetCardCategories)
  yield takeEvery(UPDATE_GIFTCARD, onUpdateGiftCard)
  yield takeEvery(DELETE_GIFTCARD, onDeleteCard)
  yield takeEvery(UPDATE_GIFTCARD_CATEGORY, onUpdateGiftCardCategory)
}

export default giftcardSaga;
