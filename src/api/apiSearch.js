import axiosClient from './axiosClient.js';

const apiSearch = {
    getAllSearch(searchTerm) {
        const url = `/search/products?search=${searchTerm}`;
        return axiosClient.get(url);
    },
}

export default apiSearch;

