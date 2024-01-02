import axiosClient from "./axiosClient.js";

const apiAdmin = {
  login(data) {
    return axiosClient.post("admins/login", data);
  },
  getAllShopProduct() {
    return axiosClient.get("getall/shop_products");
  },
  getAllShop() {
    return axiosClient.get("shops");
  },
  getAllAccount() {
    return axiosClient.get("customers");
  },
};

export default apiAdmin;
