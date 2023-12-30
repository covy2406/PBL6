import axiosClient from "./axiosClient";

const GET_INFO_URL = "getshopdetail/shops";
const UPDATE_INFO_URL = "shops";
const GET_ALL_ORDERS_URL = "getallorders/shops?status=all";
const GET_ALL_PRODUCTS_URL = "getallshopproducts/shops";

const apiShop = {
  getinfo() {
    return axiosClient.get(GET_INFO_URL);
  },

  updateinfo(data, id) {
    return axiosClient.post(UPDATE_INFO_URL + `/${id}`, data);
  },
  getallorders() {
    return axiosClient.get(GET_ALL_ORDERS_URL);
  },
  getallproducts() {
    return axiosClient.get(GET_ALL_PRODUCTS_URL);
  },
};

export default apiShop;
