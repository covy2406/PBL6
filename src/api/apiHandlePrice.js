import axiosClient from "./axiosClient.js";

const apiHandlePrice = {
  getPrice(minPrice, maxPrice, isOld) {
    if (isOld) {
      const url = `/searchByPrice/shop_products?minPrice=${minPrice}&maxPrice=${maxPrice}&isOld=${isOld}`;
      return axiosClient.get(url);
    }
    const url = `/searchByPrice/shop_products?minPrice=${minPrice}&maxPrice=${maxPrice}`;
    return axiosClient.get(url);
  },
};
export default apiHandlePrice;
