import axiosClient from "./axiosClient.js";

const apiProduct = {
  // lấy tất cả
  getAll() {
    const url = "products";
    return axiosClient.get(url);
  },

  // lấy theo id
  get(id) {
    const url = `products/${id}`;
    return axiosClient.get(url);
  },

  // tạo mới
  add(data) {
    const url = "products";
    return axiosClient.post(url, data);
  },

  // chỉnh sửa cập nhật mới
  update(data) {
    const url = `products/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `products/${id}`;
    return axiosClient.delete(url);
  },
};

export default apiProduct;
