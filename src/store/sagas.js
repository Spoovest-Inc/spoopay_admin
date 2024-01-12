import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"


import LayoutSaga from "./layout/saga"
import cryptoSaga from "./crypto/saga"
import dashboardSaga from "./dashboard/saga";
import dashboardSaasSaga from "./dashboard-saas/saga";
import contactsSaga from "./contacts/saga";

import chatSaga from "./chat/saga"

// blogs
import blogsSaga from "./blogs/saga"

// gift cards
import giftCardsSaga from "./giftcard/saga"

import batchSaga from "./auth/batch/saga"
import adminSaga from "./admin/saga"

import projectsSaga from "./projects/saga"

import transactionSaga from "./transactions/saga"

export default function* rootSaga() {
  yield all([
    //public
  
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(cryptoSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga),
    fork(contactsSaga),
    fork(batchSaga),
    fork(adminSaga),
    fork(blogsSaga),
    fork(giftCardsSaga),
    fork(chatSaga),
    fork(projectsSaga),
    fork(transactionSaga)
  ])
}
