import axiosClient from "./axiosClient";

const apiBrand = {
    getAll() {
        const url = '/brands';
        return axiosClient.get(url);
    },
    // lấy
    get(id) {
        const url = `/brands/${id}`;
        return axiosClient.get(url);
    },

    // tạo mới
    add(data) {
        const url = '/brands'
        return axiosClient.post(url, data);
    },

    // chỉnh sửa cập nhật mới
    update(data) {
        const url = `/brands/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/brands/${id}`;
        return axiosClient.delete(url);
    }
}

export default apiBrand;