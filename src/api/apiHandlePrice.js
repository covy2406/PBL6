import axiosClient from "./axiosClient.js";

const apiHandlePrice = {
    getPrice(minPrice, maxPrice) {
        const url = `/searchByPrice/shop_products?minPrice=${minPrice}&maxPrice=${maxPrice}`;
        return axiosClient.get(url)
    }
}
export default apiHandlePrice;