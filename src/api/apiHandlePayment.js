import axiosClient from "./axiosClient";

const URL_PAYMENT = `payment/vnpay`;
const URL_DISCOUNT_WEB = `addcodepromotionbyappwed`;

const apiHandlePayment = {
  getPayment(vnp_OrderInfo, vnp_Amount) {
    return axiosClient.post(URL_PAYMENT, {
      vnp_OrderInfo: vnp_OrderInfo,
      vnp_Amount: vnp_Amount,
    });
  },

    getDiscountShop(discountShopId) {
        // console.log('in ra discountShopId', discountShopId);
        // const url = `/addcodepromotion?shop_product_id=${discountShopId}`;
        const url =  `/getPromotionByIdCutomer?shop_id=${discountShopId}`
        return axiosClient.get(url);
    },

  getDiscountWeb() {
    return axiosClient.get(URL_DISCOUNT_WEB);
  },
};
export default apiHandlePayment;
