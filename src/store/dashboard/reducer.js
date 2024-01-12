import {
    API_SUCCESS,
    API_FAIL,
    GET_REPORTS
} from "./actionTypes";

const INIT_STATE = {
    reports: []
};

const Dashboard = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_SUCCESS:
          return {
            ...state,
            reports: action.payload,
          }
    
        case API_FAIL:
          return {
            ...state,
            error: action.payload,
          }
        
        default:
          return state
      }
}


export default Dashboard;