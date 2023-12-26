import { useState, useEffect } from "react";
import "./OrdersCard.css";
const OrdersCard = ({ data }) => {
  //status = [pending, confirmed, delivered]
  return (
    <>
      <div className="shoporderscard__container">
        <div className="shoporderscard__container--title">
          Mã đơn hàng: {data.id}
        </div>
        <div className="shoporderscard__container--content">
          <p className="card-text">Ngày đặt: {data.orderDate}</p>
          <p className="card-text">Tình trạng: {data.status}</p>
          <p className="card-text">
            Tổng thanh toán: {parseInt(data.paid).toLocaleString("vn-VN")} đ
          </p>
          <p className="card-text">
            Khuyến mãi: {parseInt(data.discount).toLocaleString("vn-VN")} đ
          </p>
          <p className="card-text">Ngày giao: {data.deliveredDate}</p>
        </div>
      </div>
    </>
  );
};

export default OrdersCard;
