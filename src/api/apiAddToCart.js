import axiosClient from "./axiosClient";

const apiAddToCart = {
    

    // tạo mới
    add(productId) {
        const url = `/cart/add-product/${productId}`;
        return axiosClient.post(url, productId);
    },

}
export default apiAddToCart;