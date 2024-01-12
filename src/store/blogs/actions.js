import {
  GET_BLOGS,
  GET_BLOGS_FAIL,
  GET_BLOGS_SUCCESS,
  ADD_NEW_BLOG,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAIL,
  UPDATE_BLOG,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  DELETE_BLOG,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,

  UNPUBLISH_BLOG_SUCCESS,
  UNPUBLISH_BLOG_FAIL,
  UNPUBLISH_BLOG,

  GET_ALL_ADS,
  GET_ALL_ADS_SUCCESS,
  GET_ALL_ADS_FAIL
} from "./actionTypes"

export const getBlogs = () => ({
  type: GET_BLOGS,
})

export const getBlogsSuccess = blogs => ({
  type: GET_BLOGS_SUCCESS,
  payload: blogs,
})

export const getBlogsFail = errors => ({
  type: GET_BLOGS_FAIL,
  payload: errors
})

export const addNewBlog = newBlog => ({
   type: ADD_NEW_BLOG,
   payload: newBlog
})

export const addNewBlogSuccess = newBlog => ({
  type: ADD_BLOG_SUCCESS,
  payload: newBlog
})

export const addNewBlogFail = errors => ({
  type: ADD_BLOG_FAIL,
  payload: errors
})

export const updateBlog = newBlog => ({
    type: UPDATE_BLOG,
    payload: newBlog
})

export const updateBlogFail = errors => ({
    type: UPDATE_BLOG_FAIL,
    payload: errors
})

export const updateBlogSuccess = newBlog => ({
    type: UPDATE_BLOG_SUCCESS,
    payload: newBlog
})

export const deleteBlog = blog => ({
  type: DELETE_BLOG,
  payload: blog
})

export const deleteBlogFail = errors => ({
  type: DELETE_BLOG_FAIL,
  payload: errors
})

export const deleteBlogSuccess = blog => ({
  type: DELETE_BLOG_SUCCESS,
  payload: blog
})

export const unpublishBlog = blog => ({
  type: UNPUBLISH_BLOG,
  payload: blog
})

export const fetchAllAds = ads => ({
  type: GET_ALL_ADS,
  payload: ads
})









