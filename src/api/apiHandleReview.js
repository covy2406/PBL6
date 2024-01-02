import axiosClient from "./axiosClient";

const apiHandleReview = {
    getReview(shop_product_id) {
        const url = `shopproductReview/shop_product_id=${shop_product_id}`;
        return axiosClient.get(url);
    }
}
export default apiHandleReview;