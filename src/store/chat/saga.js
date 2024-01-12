import { takeEvery, put, call } from "redux-saga/effects";

// Chat Redux States
import {
  GET_CHATS,
  GET_CONTACTS,
  GET_GROUPS,
  GET_MESSAGES,
  POST_ADD_MESSAGE,
} from "./actionTypes";
import {
  getChatsSuccess,
  getChatsFail,
  getGroupsSuccess,
  getGroupsFail,
  getContactsSuccess,
  getContactsFail,
  getMessagesSuccess,
  getMessagesFail,
  addMessageSuccess,
  addMessageFail,
} from "./actions";


//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../helpers/firebase_helper"
const firebaseConfig = {
      apiKey: "AIzaSyB-XYZYtlxQDdQL_wjlrLh8zYvDaaCHUT4",
      authDomain: "flipx-1c632.firebaseapp.com",
      databaseURL: "https://flipx-1c632-default-rtdb.firebaseio.com",
      projectId: "flipx-1c632",
      storageBucket: "flipx-1c632.appspot.com",
      messagingSenderId: "532065542231",
      appId: "1:532065542231:web:5f40f3f139e9559f58c312",
      measurementId: "G-M6D35111GZ"
}
const fireBaseBackend = getFirebaseBackend(firebaseConfig)

function* onGetChats() {
  try {
    const response = yield call(
      fireBaseBackend.getChats
    );
    yield put(getChatsSuccess(response));
  } catch (error) {
    yield put(getChatsFail(error));
  }
}

function* onGetGroups() {
  try {
    const response = yield call(
      fireBaseBackend.getGroups
    );
    yield put(getGroupsSuccess(response));
  } catch (error) {
    yield put(getGroupsFail(error));
  }
}

function* onGetContacts() {
  try {
    const response = yield call(
      fireBaseBackend.getContacts
    );
    yield put(getContactsSuccess(response));
  } catch (error) {
    yield put(getContactsFail(error));
  }
}

function* onGetMessages({ roomId }) {
  try {
    const response = yield call(
      fireBaseBackend.getMessages, roomId);
    yield put(getMessagesSuccess(response));
  } catch (error) {
    yield put(getMessagesFail(error));
  }
}

function* onAddMessage({ message }) {
  try {
    const response = yield call(
      fireBaseBackend.addMessages, message);
    yield put(addMessageSuccess(response));
  } catch (error) {
    yield put(addMessageFail(error));
  }
}

function* chatSaga() {
  yield takeEvery(GET_CHATS, onGetChats);
  yield takeEvery(GET_GROUPS, onGetGroups);
  yield takeEvery(GET_CONTACTS, onGetContacts);
  yield takeEvery(GET_MESSAGES, onGetMessages);
  yield takeEvery(POST_ADD_MESSAGE, onAddMessage);
}

export default chatSaga;
