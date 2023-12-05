import axiosClient from "./axiosClient";

const apiAddToCart = {
    // tạo mới
    add(data, productId, quantity, token) {
        const url = `/cart/add-product/`;
        return axiosClient.post(
            url, 
            {
                productId,
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