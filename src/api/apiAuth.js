import axiosClient from "./axiosClient.js";

//link api to login and signup
const LOGIN_URL = "customers/login";
const SIGNUP_URL = "customers/register";

const apiAuth = {
  signup(data) {
    return axiosClient.post(SIGNUP_URL, data);
  },
  login(data) {
    return axiosClient.post(LOGIN_URL, data);
  },
};

export default apiAuth;
