import axiosClient from "./axiosClient.js";
//import {useState, useEffect} from 'react'


const apiProductHome = {
    // lấy tất cả
    getAll() {
        const url = '/getall/shop_products';
        return axiosClient.get(url);
    },

    // lấy theo id
    get(id) {
        const url = `/getall/shop_products/${id}`;
        return axiosClient.get(url);
    },

    // tạo mới
    add(data) {
        const url = '/getall/shop_productsproducts'
        return axiosClient.post(url, data);
    },

    // chỉnh sửa cập nhật mới
    update(data) {
        const url = `/getall/shop_productsproducts/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/getall/shop_productsproducts/${id}`;
        return axiosClient.delete(url);
    }
}


// 
// export const getAllProducts = () => {
//     return axiosClient.get('/products')
// }


export default apiProductHome;