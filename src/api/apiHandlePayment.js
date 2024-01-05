import axiosClient from "./axiosClient";

const URL_PAYMENT = `payment/vnpay`;
const URL_DISCOUNT_WEB = `addcodepromotionbyappwed`;

const apiHandlePayment = {
  VNPay(vnp_OrderInfo, vnp_Amount) {
    return axiosClient.post(URL_PAYMENT, {
      vnp_OrderInfo: vnp_OrderInfo,
      vnp_Amount: vnp_Amount,
      returnUrl: "http://localhost:3000/cart",
    });
  },
  CashPay(data, paid, code_discount_app) {
    const payload = {
      data: data,
      paid: paid,
      code_discount_app: code_discount_app,
    };
    return axiosClient.post("handdle-ordered", payload);
  },
  getDiscountShop(id) {
    const url = `/getPromotionByIdCutomer?shop_id=${id}`;
    return axiosClient.get(url);
  },
  getDiscountWeb() {
    return axiosClient.get(URL_DISCOUNT_WEB);
  },
};
export default apiHandlePayment;
