import axiosClient from "./axiosClient";

const apiAddToCart = {
    // tạo mới
    add(data, productId, quantity) {
        const url = `/cart/add-product/`;
        return axiosClient.post(
            url, 
            {
                productId,
                quantity: quantity,
            }, 
            {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
        });
    },
}
export default apiAddToCart;