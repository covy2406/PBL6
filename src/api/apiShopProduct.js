import axiosClient from "./axiosClient";

const apiShopProduct = {
    getAll() {
        const url = '/shop_products';
        return axiosClient.get(url);
    },
    // lấy
    get(id) {
        const url = `/shop_products/${id}`;
        return axiosClient.get(url);
    },

    // tạo mới
    add(data) {
        const url = '/shop_products'
        return axiosClient.post(url, data);
    },

    // chỉnh sửa cập nhật mới
    update(data) {
        const url = `/shop_products/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/shop_products/${id}`;
        return axiosClient.delete(url);
    }
}
export const getAllShops = () => {
    return axiosClient.get('/shop_products')
}

export default apiShopProduct;