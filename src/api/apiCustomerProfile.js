import axiosClient from "./axiosClient";

//link to api to get profile

const GET_PROFILE_URL = "customerProfile";
const UPDATE_PROFILE_URL = "customers/update";
const CHANGE_PASSWORD_URL = "customers/changepassword";
const GET_PROFILE_ORDERS_URL = "customerorders";

const apiCustomerProfile = {
  getProfile() {
    return axiosClient.get(GET_PROFILE_URL);
  },
  updateProfile(request) {
    return axiosClient.post(UPDATE_PROFILE_URL, request);
  },
  updatePassword(data) {
    return axiosClient.post(CHANGE_PASSWORD_URL, data);
  },
  getProfileOrders() {
    return axiosClient.get(GET_PROFILE_ORDERS_URL);
  },
};

export default apiCustomerProfile;
