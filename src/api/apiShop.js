import axiosClient from "./axiosClient";

const GET_INFO_URL = "getshopdetail/shops";
const UPDATE_INFO_URL = "shops";
const GET_ALL_ORDERS_URL = "getallorders/shops?status=all";
const GET_ALL_PRODUCTS_URL = "getallshopproducts/shops";
const GET_ALL_PROMOS_URL = "promotions";

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
  getallpromos() {
    return axiosClient.get(GET_ALL_PROMOS_URL);
  },
  addpromos(data) {
    return axiosClient.post(GET_ALL_PROMOS_URL, data);
  },
};

export default apiShop;
