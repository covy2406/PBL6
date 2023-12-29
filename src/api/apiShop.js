import axiosClient from "./axiosClient";

const GET_INFO_URL = "getshopdetail/shops";
const UPDATE_INFO_URL = "shops";

const apiShop = {
  getinfo() {
    return axiosClient.get(GET_INFO_URL);
  },

  updateinfo(data, id) {
    return axiosClient.post(UPDATE_INFO_URL + `/${id}`, data);
  },

  
};

export default apiShop;
