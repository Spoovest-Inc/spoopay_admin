import axios from "axios";
import giftcards from "store/giftcard/reducer";
import { del, get, post, put, update } from "./api_helper";
import * as url from "./url_helper";



// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("profile");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};



const getChats = async () => {

}



// fetch todays batch
export const fetchTodayBatch = () => {
  get(url.FETCH_TODAY_BATCH);
}



//Admin methods
export const getAdmins = () => get(url.GET_ADMINS,  {
  headers: {
    "Accept": "application/json",
    "Access-Control-Allow-Origin":"*"
}
});
export const closeAdminBatchAPI = admin => put(url.CLOSE_ADMIN_BATCH, admin);
export const openAdminBatchAPI = admin => put(url.OPEN_ADMIN_BATCH, admin);
export const addNewAdmin = admin => post(url.ADD_NEW_ADMIN, admin);

// Users 
export const getUsers = () => get(url.GET_USERS);
export const updateUser = user => put(url.UPDATE_USER, user);
export const addNewUser = user => post(url.ADD_NEW_USER, user);
export const deleteUser = admin => del(url.DELETE_USER, { headers: { admin } });
export const suspendUser = user => put(url.SUSPEND_USER, user, { headers: { user } });
export const activateUser = user => put(url.ACTIVATE_USER, user, { headers: { user } });
export const getUserProfile = id => get(url.GET_USER_PROFILE, { headers: { id } });

// ads 
export const geAllAds = () => get(url.GET_ALL_ADS);

export const getLogs = () => get(url.GET_LOGS)



// get ablogs
export const getBlogs = () => get(url.GET_BLOGS)
export const addNewBlog = newBlog => post(url.ADD_NEW_BLOG, newBlog);
export const updateBlog = newBlog => put(url.UPDATE_BLOG, newBlog)

// delete blog
export const deleteBlog = blog => del(url.DELETE_BLOG, { headers: { blog}})

// giftcards
export const getGiftCards = () => get(url.GET_GIFT_CARDS);
export const addGiftCard = (formData) => post(url.ADD_GIFT_CARD, {formData})
export const giftcardCategories = id => get(`${url.GET_GIFTCARD_CATEGORIES}/${id}`, { params: { id } });
export const updateGiftCard = giftcards => post(url.UPDATE_GIFTCARD, giftcards)
export const deleteCard = giftcard => del(url.DELETE_GIFTCARD, { headers: { giftcard }})
export const updateGiftCardCategory = data => put(url.UPDATE_GIFTCARD_CATEGORY, data)


// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA);
export const getYearlyData = () => get(url.GET_YEARLY_DATA);
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA);

export const getReports = () => get(url.GET_REPORTS);


// get transactions
export const getTransactions = () => get(url.GET_TRANSACTIONS);
export const approveTransaction = id => put(url.APPROVE_TRANSACTION, { headers: { id }});
export const getPendingTransactions = () => get(url.GET_PENDING_TRANSACTIONS);


// Wallet and cryptos
export const updateWallet = payload => put(url.UPDATE_WALLET, payload);


// Login Method
// const postJwtLogin = data => post(url.POST_JWT_LOGIN, data);


// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } });

// get Events
export const getEvents = () => get(url.GET_EVENTS);

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } });

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES);



// get groups
export const getGroups = () => get(url.GET_GROUPS);

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS);

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message);

// get orders
export const getOrders = () => get(url.GET_ORDERS);

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order);

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order);

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } });

// get cart data
export const getCartData = () => get(url.GET_CART_DATA);

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS);

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer);

// update CUSTOMER
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer);

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } });

// get shops
export const getShops = () => get(url.GET_SHOPS);

// get wallet
export const getWallet = () => get(url.GET_WALLET);

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS);

// get invoices
export const getInvoices = () => get(url.GET_INVOICES);

// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } });

// get project
export const getProjects = () => get(url.GET_PROJECTS);

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } });

// get tasks
export const getTasks = () => get(url.GET_TASKS);





/** PROJECT */
// add user
export const addNewProject = project => post(url.ADD_NEW_PROJECT, project);

// update user
export const updateProject = project => put(url.UPDATE_PROJECT, project);

// delete user
export const deleteProject = project =>
  del(url.DELETE_PROJECT, { headers: { project } });



// get inboxmail
export const getInboxMails = () => get(url.GET_INBOX_MAILS);

// add inboxmail
export const addNewInboxMail = inboxmail =>
  post(url.ADD_NEW_INBOX_MAIL, inboxmail);

// delete inboxmail
export const deleteInboxMail = inboxmail =>
  del(url.DELETE_INBOX_MAIL, { headers: { inboxmail } });

// get starredmail
export const getStarredMails = () => get(url.GET_STARRED_MAILS);

// get importantmail
export const getImportantMails = () => get(url.GET_IMPORTANT_MAILS);

// get sent mail
export const getSentMails = () => get(url.GET_SENT_MAILS);

// get trash mail
export const getTrashMails = () => get(url.GET_TRASH_MAILS);

// get starredmail
export const getDraftMails = () => get(url.GET_DRAFT_MAILS);



export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } });

export const getEarningChartsData = month =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } });

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS);

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  });
};
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  });
};

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  });
};

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  });
};




export {
    getLoggedInUser,
    isUserAuthenticated,
    getChats
  };
  