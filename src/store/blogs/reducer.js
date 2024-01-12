import {
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAIL,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAIL,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_SUCCESS,
  GET_ALL_ADS_SUCCESS,
  GET_ALL_ADS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  blogs: [],
  error: {},
  ads: [],
  loading: false,
}

const blogs = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload,
      }

    case GET_BLOGS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        blogs: [ ...state.blogs, action.payload],
      }


      case UPDATE_BLOG_SUCCESS:
        return {
          ...state,
          blogs: [ ...state.blogs, action.payload],
        }
  
      case UPDATE_BLOG_FAIL:
        return {
          ...state,
          error: action.payload,
        }

        case DELETE_BLOG_SUCCESS:
          return {
            ...state,
            blogs: [ ...state.blogs, action.payload]
          }
    
        case DELETE_BLOG_FAIL:
          return {
            ...state,
            error: action.payload,
          }

    
       case GET_ALL_ADS_FAIL:
       return {
            ...state,
           error: action.payload
       }

       case GET_ALL_ADS_SUCCESS:
         return {
           ...state,
           ads: [...state.ads, action.payload]
         }
  

  
  
 

    default:
      return state
  }
}

export default blogs
