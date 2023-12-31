import axiosClient from "./axiosClient";

const apiComment = {
    getComment(shop_product_id, numberOfStars) {
        console.log('in ra 2 id: ', numberOfStars, shop_product_id);
        const url = `/shopproductReview/?numberOfStars=${numberOfStars}&shop_product_id=${shop_product_id}`;
        return axiosClient.get(url);
    }
}
export default apiComment;