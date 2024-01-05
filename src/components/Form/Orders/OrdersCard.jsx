import { useEffect } from "react";
import "./OrdersCard.css";
import useAuth from "hook/useAuth";
import { getStatusFromEn } from "datas/statusData";

const OrdersCard = ({ data }) => {
  const { url } = useAuth();
  const handleShopRedirect = () => {
    window.location.href = `/shop/${data.shop_id}`;
  };
  const handleRebuy = () => {
    window.location.href = `/product/${data.shop_product_id}`;
  };
  const handleReview = () => {};
  return (
    <>
      <div className="shoporderscard__container">
        <div className="shoporderscard__container--top">
          <div className="shoporderscard__shop">
            <div className="shoporderscard__shop--name">
              Cửa hàng: {data.shopName}
            </div>
            <button
              className="shoporderscard__shop--button"
              onClick={handleShopRedirect}>
              Ghé shop
            </button>
          </div>
          <div className="shoporderscard__order--status">
            Tình trạng: {getStatusFromEn(data.status)}
          </div>
        </div>
        <div className="shoporderscard__product">
          <img
            className="shoporderscard__product--image"
            src={url + data.image}
            alt=""></img>
          <div className="shoporderscard__product--name">{data.name}</div>
        </div>
        <div className="shoporderscard__container--bot">
          <div className="shoporderscard--total">
            Thành tiền: {parseInt(data.total_price).toLocaleString("vn-VN")} đ
          </div>
          <div className="shoporderscard__button-list">
            <button
              className="shoporderscard__button-list--button"
              onClick={handleRebuy}>
              Mua lại
            </button>
            <button
              className="shoporderscard__button-list--button"
              onClick={handleReview}>
              Đánh giá
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersCard;
