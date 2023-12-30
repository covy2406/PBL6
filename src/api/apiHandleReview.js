import axiosClient from "./axiosClient";

const apiHandleReview = {
    getReview(all, id) {
        const url = `shopproductReview/?numberOfStars=${all}&shop_product_id=${id}`;
        return axiosClient.get(url);
    }
}
export default apiHandleReview;