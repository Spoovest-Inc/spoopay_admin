import {
  GET_ADMINS_SUCCESS,
  GET_ADMINS_FAIL,

  CLOSE_ADMIN_BATCH_SUCCESS,
  CLOSE_ADMIN_BATCH_FAIL,

  ADD_NEW_ADMIN,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_FAIL,

  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER,

  GET_LOG_SUCCESS,
  GET_LOG_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  admins: [],
  error: {},
  logs:[],
  loading: false,
}

const admins = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        admins: action.payload,
        loading: false,
      }

    case GET_ADMINS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case CLOSE_ADMIN_BATCH_SUCCESS:
      return {
        ...state,
        admins: state.users.map(admin =>
          admin.id.toString() === action.payload.id.toString()
            ? { admin, ...action.payload }
            : admin
        ),
      }
    
    case CLOSE_ADMIN_BATCH_FAIL:
      return {
        ...state,
        error: action.payload
      }

      case ADD_NEW_ADMIN:
        return {
          ...state, 
          loading: true
        }

    case ADD_ADMIN_SUCCESS:

      return {
        ...state,
        admins: [ ...state.admins, action.payload],
        loading: false
       
      }

      case DELETE_USER:
        return {
          ...state,
          loading: true
        }

    case ADD_ADMIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

      case DELETE_USER_SUCCESS:
        return {
          ...state,
          admins: state.admins.filter(
            admin => admin.id !== action.payload.id
          ),
          loading: false
        }
  
      case DELETE_USER_FAIL:
        return {
          ...state,
          error: action.payload,
        }

      
      case GET_LOG_SUCCESS:
        return {
          ...state,
          logs: action.payload
        }

        case GET_LOG_FAIL:
          return {
            ...state,
            error: action.payload
          }


      

  
    default:
      return state
  }
}

export default admins
