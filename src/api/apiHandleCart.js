import axiosClient from "./axiosClient";

const ADD_TO_CART_URL = `cart/add-product/`;
const VIEW_CART_URL = `view-cart/`;

const apiHandleCart = {
    // add to cart
    add(productId, quantity) {
        return axiosClient.post(ADD_TO_CART_URL, {
            quantity: quantity,
            shop_product_id: productId,
        });
    },

    // show all product in cart
    viewCart() {
        return axiosClient.get(VIEW_CART_URL);
    },

    incqty(id) {
        const ICR_URL = `/in_decreaseAmount?product_order_id=${id}&increase`;
        const res = axiosClient.get(ICR_URL, {
            increase: 1,
        });
        return res;
    },
    
    decqty(id) {
        const DCR_URL = `/in_decreaseAmount?product_order_id=${id}&decrease`;
        return axiosClient.get(DCR_URL, {
            decrease: 1,
        });
    },
};

export default apiHandleCart;
