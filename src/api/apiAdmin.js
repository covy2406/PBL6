import axiosClient from "./axiosClient.js";

const apiAdmin = {
  login(data) {
    return axiosClient.post("admins/login", data);
  },
  getAllShopProduct() {
    return axiosClient.get("getall/shop_products");
  },
  deleteShopProduct(id) {
    return axiosClient.delete(`shop_products/${id}`);
  },
  getAllShop() {
    return axiosClient.get("shops");
  },
  getAllAccount() {
    return axiosClient.get("customers");
  },
  deleteAccount(id) {
    return axiosClient.delete(`customers/${id}`);
  },
};

export default apiAdmin;
