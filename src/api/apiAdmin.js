import axiosClient from "./axiosClient.js";

const apiAdmin = {
  login(data) {
    return axiosClient.post("login", data);
  },
  getAllShopProduct() {
    return axiosClient.get("getall/shop_products");
  },
  getAllShop() {
    return axiosClient.get("shops");
  },
  getAllAccount(data) {
    return axiosClient.get("", data);
  },
};

export default apiAdmin;
