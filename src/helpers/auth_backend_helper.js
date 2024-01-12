import axios from "axios";
import { del, get, post, put } from "./api_helper";
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


// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data);

const createBatchAPI = formData => post(url.POST_BATCH, formData);




export {
    getLoggedInUser,
    isUserAuthenticated,
    postFakeLogin,
    createBatchAPI

  };
  