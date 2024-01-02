import axiosClient from "./axiosClient";

const apiComment = {
  getComment(shop_product_id) {
    const url = `/shopproductReview/shop_product_id=${shop_product_id}`;
    return axiosClient.get(url);
  },
};
export default apiComment;
