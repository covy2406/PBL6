import axiosClient from './axiosClient.js';


const apiProductDetail = {
    get(id) {
        const url = `/getdetailshop_product/${id}`;
        return axiosClient.get(url);
    },
}
export default apiProductDetail;