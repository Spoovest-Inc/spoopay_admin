import { UPDATE_GIFTCARD_CATEGORY } from "helpers/url_helper"
import { GET_GIFT_CARDS,
     GET_GIFT_CARDS_SUCCESS, 
     GET_GIFT_CARDS_FAIL,
     ADD_GIFT_CARD, 
     ADD_GIFT_CARD_SUCCESS,
     ADD_GIFT_CARD_FAIL, 
     GET_GIFTCARDS_CATEGORIES_SUCCESS,
     GET_GIFTCARDS_CATEGORIES,
     GET_GIFTCARDS_CATEGORIES_FAIL, 
     UPDATE_GIFTCARD, 
     UPDATE_GIFTCARD_SUCCESS,
     UPDATE_GIFTCARD_FAIL,
     DELETE_GIFTCARD,
     DELETE_GIFTCARD_FAIL,
     DELETE_GIFTCARD_SUCCESS
    } from "./actionTypes"

export const getGiftCards = () => ({
    type: GET_GIFT_CARDS
})


export const getGiftCardsSuccess = formData => ({
    type: GET_GIFT_CARDS_SUCCESS,
    payload: formData
})

export const getGiftCardsFail = error => ({
    type: GET_GIFT_CARDS_FAIL,
    payload: error
})

export const addGiftCard = (formData) => ({
    type: ADD_GIFT_CARD,
    payload: formData
})

export const addGiftCardSuccess = (formData) => ({
    type: ADD_GIFT_CARD_SUCCESS,
    payload: formData
})

export const addGiftCardFail = error => ({
    type: ADD_GIFT_CARD_FAIL,
    payload: error

})

export const onGetCardCategories = id => ({
    type: GET_GIFTCARDS_CATEGORIES,
    payload: id
})

export const getGiftCardsCategoriesSuccess = categories => ({
    type: GET_GIFTCARDS_CATEGORIES_SUCCESS,
    payload: categories
})

export const getGiftCardsCategoriesFail = error => ({
    type: GET_GIFTCARDS_CATEGORIES_FAIL,
    payload: error
})

export const updateGiftCardSuccess = giftcard => ({
    type: UPDATE_GIFTCARD_SUCCESS,
    payload: giftcard
})

export const updateGiftCardFail = error => ({
    type: UPDATE_GIFTCARD_FAIL,
    payload: error
})

export const updateGiftCard = giftcard => ({
    type: UPDATE_GIFTCARD,
    payload: giftcard
})

export const updateGiftCardCategory = data => ({
    type: UPDATE_GIFTCARD_CATEGORY,
    payload: data
})

export const deleteCard = giftcard => ({
    type: DELETE_GIFTCARD,
    payload: giftcard
})

export const deleteCardSuccess = giftcard => ({
    type: DELETE_GIFTCARD_SUCCESS,
    payload: giftcard
})

export const deleteCardFail = error => ({
    type: DELETE_GIFTCARD_FAIL,
    payload: error
})


