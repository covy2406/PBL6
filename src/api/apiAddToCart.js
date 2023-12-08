import axiosClient from "./axiosClient";

const apiAddToCart = {
    // tạo mới
    add( productId, quantity) {
        const url = `/cart/add-product/`;
        return axiosClient.post(
            url, 
            {
                shop_product_id: productId,
                quantity: quantity,
            },
            );
    },
}
export default apiAddToCart;

// {
//     headers: {
//       Authorization: `Bearer ${data.token}`,
//     },
// }