import axiosClient from "./axiosClient.js";

const apiProductDetail = {
  viewDetail(id) {
    console.log("apiProductDetail", id);
    const url = `/getdetailshop_product/${id}`;
    return axiosClient.get(url);
  },
};
export default apiProductDetail;
