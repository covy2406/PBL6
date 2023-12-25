import axiosClient from "./axiosClient.js";


const apiHandleBrand = {
    // show ra danh sach ten cac brand (hang dien thoai)
    getAllBrand() {
        const url = '/brands';
        return axiosClient.get(url);
    },

    // api show ra danh sach cac san pham theo brand (hang dien thoai)
    getShopProductbyBrand(id) {
        console.log("api", id);
        const url = `/getshopproductbybrand/shop_products?brand_id=${id}`;
        return axiosClient.get(url);
    }
}
export default apiHandleBrand;