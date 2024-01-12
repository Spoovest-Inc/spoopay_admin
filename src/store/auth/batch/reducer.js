import { CREATE_BATCH, CREATE_BATCH_SUCCESS, CREATE_BATCH_FAIL} from "./actionTypes";

const initialState = {
  error: "",
  success: "",
};

const Batch = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BATCH:
      state = { ...state };
      break;
    case CREATE_BATCH_SUCCESS:
      state = { ...state, success: action.payload };
      break;
    case CREATE_BATCH_FAIL:
      state = { ...state, error: action.payload };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Batch;
