import axiosClient from './axiosClient.js';


const apiProductDetail = {

    getAll() {
        const url = '/getdetailshop_product';
        return axiosClient.get(url)
    },
    get(id) {
        const url = `/getdetailshop_product/${id}`;
        return axiosClient.get(url);
    },
}
export default apiProductDetail;