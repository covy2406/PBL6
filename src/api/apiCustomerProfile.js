import axiosClient from "./axiosClient";

//link to api to get profile

const GET_PROFILE_URL = "customerProfile";
const UPDATE_PROFILE_URL = "customers";

const apiCustomerProfile = {
  getProfile() {
    return axiosClient.get(GET_PROFILE_URL, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),
      },
    });
  },
  updateProfile(data, id) {
    return axiosClient.put(UPDATE_PROFILE_URL + "/" + id, data);
  },
};

export default apiCustomerProfile;
