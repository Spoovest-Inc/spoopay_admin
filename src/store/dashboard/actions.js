import {
  GET_REPORTS,
  API_SUCCESS,
  API_FAIL
  } from "./actionTypes"
  
  export const getReports = () => ({
    type: GET_REPORTS,
  })
  
  export const getReportSuccess = reports => ({
    type: API_SUCCESS,
    payload: reports,
  })
  
  export const getReportFail = error => ({
    type: API_FAIL,
    payload: error,
  })
  