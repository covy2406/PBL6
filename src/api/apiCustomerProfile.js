import axiosClient from "./axiosClient";

//link to api to get profile

const GET_PROFILE_URL = "customers/profile";

const apiCustomerProfile = {
  getProfile(data) {
    return axiosClient.get(GET_PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
  },
  updateProfile(data) {
    return axiosClient.put(GET_PROFILE_URL, data, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
  },
};

export default apiCustomerProfile;
