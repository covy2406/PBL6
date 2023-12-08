import axiosClient from "./axiosClient";

const apiRemoveProduct = {
    deleteProduct(id) {
        const url = `/in_decreaseAmount/`;
        return axiosClient.delete(
            url,
            {
                product_order_id: id
            }
        );
    }
}
export default apiRemoveProduct;