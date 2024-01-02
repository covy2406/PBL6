import axiosClient from './axiosClient.js';

const apiSearch = {
    getAllSearch(searchTerm) {
        //const url = `/search/customer?search=${searchTerm}`;
        //const url = `search/products`;
        console.log('in ra nội dung search', searchTerm);
        const url = `search/shop_products?search=${searchTerm}`
        return axiosClient.get(url);
    },
}

export default apiSearch;

