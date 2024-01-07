import axiosClient from "./axiosClient";

const GET_INFO_URL = "getshopdetail/shops";
const UPDATE_INFO_URL = "shops";
const GET_ALL_ORDERS_URL = "getallorders/shops?status=all";
const GET_ALL_PRODUCTS_URL = "getallshopproducts/shops";
const GET_ALL_SHOP_PRODUCTS_URL = `getallshopproducts/shops`;

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
  processorder(data) {
    return axiosClient.post(`shopprocessesorders`, data);
  },
  getallproducts() {
    return axiosClient.get(GET_ALL_PRODUCTS_URL);
  },
  getallpromos(id) {
    return axiosClient.get(`getPromotionByIdCutomer/?shop_id=${id}&isShop`);
  },
  addpromos(data) {
    return axiosClient.post("promotions", data);
  },
  updatepromos(data, id) {
    return axiosClient.put(`promotions/${id}`, data);
  },
  delpromos(id) {
    return axiosClient.delete(`promotions/${id}`);
  },
  getAllShopProduct() {
    return axiosClient.get(GET_ALL_SHOP_PRODUCTS_URL);
  },
};

export default apiShop;
