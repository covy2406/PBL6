import axiosClient from "./axiosClient";

const apiRemoveProduct = {
    deleteProduct(product_order_id) {
        const url = `/product_orders/${product_order_id}`;
        return axiosClient.delete(url
           
        );
    }
}
export default apiRemoveProduct;