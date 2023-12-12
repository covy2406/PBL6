import axiosClient from "./axiosClient.js";

//link api to login and signup
const LOGIN_URL = "product";
const SIGNUP_URL = "customers/register";

const apiAdmin = {
  showProducts(id) {
    return axiosClient.post(SIGNUP_URL + "/" + id);
  },
  deleteProducts(id) {
    return axiosClient.delete(LOGIN_URL + "/" + id);
  },
  addProducts(data) {
    return axiosClient.post(LOGIN_URL, data);
  },
};

export default apiAdmin;
