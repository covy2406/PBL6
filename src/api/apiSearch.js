import axiosClient from './axiosClient.js';

const apiSearch = {
    getAll() {
        const url = '/search/shop_products';
        return axiosClient.get(url);
    },

    get(search) {
        const url = `/search/shop_products/${search}`;
        return axiosClient.get(url);
    }
}

export default apiSearch;