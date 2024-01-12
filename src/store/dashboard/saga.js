import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Crypto Redux States
import { GET_REPORTS } from "./actionTypes";
import { getReportFail, getReportSuccess } from "./actions";

//Include Both Helper File with needed methods
import {
    getReports
}
    from "../../helpers/backend_helper";

function* getReport() {
    try {
        response = yield call(getReports);
        yield put(getReportSuccess(response));
    } catch (error) {
        yield put(getReportFail(error));
    }
}

export function* watchGetChartsData() {
    yield takeEvery(GET_REPORTS, getReport);
}

function* dashboardSaga() {
    yield all([fork(watchGetChartsData)]);
}

export default dashboardSaga;
