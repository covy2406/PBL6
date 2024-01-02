import axiosClient from "./axiosClient.js";

const apiProductDetail = {
  viewDetail(id) {
    const url = `/getdetailshop_product/${id}`;
    console.log(url);
    return axiosClient.get(url);
  },

  getComment(shop_product_id) {
    const url = `shopproductReview/?shop_product_id=${shop_product_id}`;
    return axiosClient.get(url);
}
};
export default apiProductDetail;
