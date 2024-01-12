import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"

// batch 
import Batch from "./auth/batch/reducer"

//crypto
import crypto from "./crypto/reducer"

// admin
import admin from "./admin/reducer"
//Dashboard 
import Dashboard from "./dashboard/reducer";

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer";

//contacts
import contacts from "./contacts/reducer"

// blogs 
import blogs from "./blogs/reducer"

// gift cards
import giftcards from "./giftcard/reducer"

//chat
import chat from "./chat/reducer"

//projects
import projects from "./projects/reducer"

//transactions
import transactions from "./transactions/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  crypto,
  Dashboard,
  DashboardSaas,
  Batch,
  contacts,
  blogs,
  admin,
  giftcards,
  chat,
  projects,
  transactions
})

export default rootReducer
