import axiosClient from './axiosClient.js';

const apiSearch = {
    getAll(i) {
        const url = `/search/products?search=${i}`;
        return axiosClient.get(url);
    },

    get(search) {
        const url = `/search/shop_products/${search}`;
        return axiosClient.get(url);
    }
}

export default apiSearch;