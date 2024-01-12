import { call, put, takeEvery } from "redux-saga/effects"
import { ToastContainer, toast } from 'react-toastify';

// Crypto Redux States
import { GET_BLOGS, ADD_NEW_BLOG, UPDATE_BLOG, DELETE_BLOG, GET_ALL_ADS} from "./actionTypes"

import {
 getBlogsSuccess,
 getBlogsFail,
 addNewBlogSuccess,
 addNewBlogFail,
 updateBlogFail,
 updateBlogSuccess,
 deleteBlogSuccess,
 deleteBlogFail,

} from "./actions"

//Include Both Helper File with needed methods
import { getBlogs, addNewBlog, updateBlog, deleteBlog, geAllAds} from "../../helpers/backend_helper"

function* fetchBlogs() {
  try {
    const response = yield call(getBlogs)
    yield put(getBlogsSuccess(response))
  } catch (error) {
    yield put(getBlogsFail(error))
  }
}

function* onAddNewBlog({ payload: newBlog}) {
  try {
    const response = yield call(addNewBlog, newBlog)
    yield put(addNewBlogSuccess(response))
  } catch (error) {
    yield put(addNewBlogFail(error))

  }
}

function* onUpdateBlog({ payload: newBlog}) {
  try {
    const response = yield call(updateBlog, newBlog)
    window.location.reload(false); 
    yield put(updateBlogSuccess(response))
  } catch (error) {
    yield put(updateBlogFail(error))
  }
}


function* onDeleteBlog({ payload: blog}) {
  try {
    const response = yield call(deleteBlog, blog)
    yield put(deleteBlogSuccess(response))
  } catch (error) {
    yield put(deleteBlogFail(error))
   
  }
}

function* onGetAllAds(){
  try {
    const response = yield call(geAllAds)
  } catch (error) {
    console.log(error.response.data.message)
  }
}


function* blogsSaga() {
  yield takeEvery(GET_BLOGS, fetchBlogs)
  yield takeEvery(ADD_NEW_BLOG, onAddNewBlog)
  yield takeEvery(UPDATE_BLOG, onUpdateBlog)
  yield takeEvery(DELETE_BLOG, onDeleteBlog)
  yield takeEvery(GET_ALL_ADS, onGetAllAds)
}

export default blogsSaga;
