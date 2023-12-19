import axiosClient from "./axiosClient";

const GET_INFO_URL = "getshopdetail/shops";

const apiShop = {
  getinfo() {
    return axiosClient.get(GET_INFO_URL);
  },
};

export default apiShop;
