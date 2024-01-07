import axiosClient from "./axiosClient";

const apiOldProduct = {
  getOldProduct(isOld) {
    const url = `getall/shop_products?isOld=`;
    return axiosClient.get(url);
  },
};
export default apiOldProduct;
