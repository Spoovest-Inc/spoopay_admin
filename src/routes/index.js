import React from "react"
import { Redirect } from "react-router-dom"




// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

import Waiting from "../pages/Authentication/Waiting"
import VerifyToken from "../pages/Authentication/Verify-token"
import OpenBatch from "../pages/Authentication/OpenBatch"
import Affirmation from "../pages/Authentication/Affitmation"
import ChangePassword from "pages/Authentication/ChangePassword"

import Admins from "../pages/Admins/AdminList/admins-list"

// GiftCards
import GiftCards from "../pages/GiftCards/CardList/giftcard-list"
import SingleCard from "../pages/GiftCards/CardProfile/card-profile"
import SingleCategory from "../pages/GiftCards/CardProfile/subcard-profile"
import sellRequest from "../pages/GiftCards/sellRequest-list"
import subCategories from "../pages/GiftCards/CardList/subcategories"


import Spoowealth from "../pages/Savings/Spoowealth"


// // Pages Component
import Chat from "../pages/Chat/Chat"


import AdManager from "../pages/AdManager/ads"
import LeaderBoard from "../pages/Users//LeaderBoard"





//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Login2 from "../pages/AuthenticationInner/Login2"
import Register1 from "../pages/AuthenticationInner/Register"
import Register2 from "../pages/AuthenticationInner/Register2"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2"
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword"
import ForgetPwd2 from "../pages/AuthenticationInner/ForgetPassword2"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2"
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail"
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2"
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification"
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2"
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification"
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import DashboardSaas from "../pages/Dashboard-saas/index"
import DashboardCrypto from "../pages/Dashboard-crypto/index"
import Blog from "../pages/Blogs/BlogList/blog-list"

//Crypto

import CryptoBuySell from "../pages/Crypto/crypto-buy-sell"
import CryptoExchange from "../pages/Crypto/crypto-exchange"
import CryptoLending from "../pages/Crypto/crypto-lending"
import CryptoOrders from "../pages/Crypto/CryptoOrders/crypto-orders"
import CryptoKYCApplication from "../pages/Crypto/crypto-kyc-application"
import CryptoIcoLanding from "../pages/Crypto/CryptoIcoLanding/index"

import Charts from  "../pages/Charts/EChart"


import RateRange from "../pages/Rates/Rates"
import Currencies from "../pages/Rates/Currencies"
import Wallets from "../pages/Rates/wallets"

import Tasks from "../pages/Tasks/tasks-list"


//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiColors from "../pages/Ui/UiColors"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGeneral from "../pages/Ui/UiGeneral"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiSweetAlert from "../pages/Ui/UiSweetAlert"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiRating from "../pages/Ui/UiRating"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"
import UiNotifications from "../pages/Ui/ui-notifications"
import UiOffCanvas from "pages/Ui/UiOffCanvas"
import UiBreadcrumb from '../pages/Ui/UiBreadcrumb';
import UiPlaceholders from "../pages/Ui/UiPlaceholders";
import UiToasts from "../pages/Ui/UiToast";

//Pages
import PagesStarter from "../pages/Utility/pages-starter"
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import PagesTimeline from "../pages/Utility/pages-timeline"
import PagesFaqs from "../pages/Utility/pages-faqs"
import PagesPricing from "../pages/Utility/pages-pricing"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"

//Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid"
import ContactsList from "../pages/Contacts/ContactList/contacts-list"
import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile"

//Transactions
import Transactions from "../pages/Transactions/transactions"
import PendingTransactions from "../pages/Transactions/pending-transactions"
import DeclinedTransactions from "../pages/Transactions/declined-transactions"
import ApprovedTransactions from "../pages/Transactions/approved-transactions"
import QueingTransactions from "../pages/Transactions/queing-transactions"
import Email from "../pages/Email/email"
import FailedTransactions from "../pages/Transactions/failed-transactions"


// Users 
import UsersList from "../pages/Users/UserList/users-list"
import UserProfile from "../pages/Users/ContactsProfile/contacts-profile"
import StaffList from "../pages/Users/UserList/staff-list"
import UserWallets from "../pages/Users/UserList/user-wallet"


// Logs
import LogsList from "../pages/Logs/logs-list"

// Notifications
import Notifications from "../pages/Logs/notifications"
import ServiceProvider from "../pages/More/service-providers"
import SpecialCodes from "../pages/More/special-code"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  
  { path: "/blogs", component: Blog },
  { path: "/send-mail", component: Email},
  { path: "/profile", component: UserProfile},
  { path: "/staff-profiles", component:StaffList },
  { path: "/service-providers", component: ServiceProvider },
  { path: "/special-codes", component: SpecialCodes },

  // Admins 
  {path: "/admin", component: Admins},
  {path:"/admin-logs", component: LogsList},

 
  //Rates
  { path: "/currencies", component: Currencies },
   {path: "/rates", component: RateRange},
   {path: "/wallets", component: Wallets},

   // Tasks
   { path: "/tasks-list", component: Tasks },

   { path: "/spoowealth", component: Spoowealth },




    //Transactions
    { path: "/transactions", component: Transactions },
    { path: "/pending-transactions", component: PendingTransactions },
    { path: "/declined-transactions", component: DeclinedTransactions },
    { path: "/approved-transactions", component: ApprovedTransactions },
    { path: "/queing-transactions", component: QueingTransactions },
    { path: "/failed-transactions", component: FailedTransactions },



    // Contacts
    { path: "/contacts-grid", component: ContactsGrid },
    { path: "/contacts-list", component: ContactsList },
    { path: "/contacts-profile/:id", component: ContactsProfile },

      //chat
    { path: "/chat", component: Chat },


      //ad manager
    { path: "/ad-manager", component: AdManager },

    // users 
    { path: "/users", component: UsersList },
    { path: "/user-profile/:id", component: UserProfile },
    {path: "/user-wallet/:id", component: UserWallets},
    {path: "/leaderboard", component: LeaderBoard},




  { path: "/notifications", component: Notifications},
 


 

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/waiting", component: Waiting},
  { path: "/verify-token", component: VerifyToken},
  { path: "/open-batch", component: OpenBatch},

  { path: "/affirmation", component: Affirmation},
  { path: "/change-password", component: ChangePassword},
]

export { authProtectedRoutes, publicRoutes }
