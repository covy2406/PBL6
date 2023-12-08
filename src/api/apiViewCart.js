import axiosClient from "./axiosClient";

const apiViewCart = {
    getViewCart() {
        const url = `/view-cart`;
        return axiosClient.get(url);
    }
}
export default apiViewCart;