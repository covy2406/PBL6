import axiosClient from "./axiosClient";

const apiAddToCart = {
    // tạo mới
    add( productId, quantity) {
        const url = `/cart/add-product/`;
        return axiosClient.post( 
            url, 
            {
                quantity: quantity,
                shop_product_id: productId, 
            });
    },
}
export default apiAddToCart;
