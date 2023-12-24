import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ShopOrdersCard.css";
const ShopOrdersCard = ({ data, filter }) => {
  //status = [pending, confirmed, delivered]
  const [order, setOrder] = useState({
    id: data.id,
    deliveredDate:
      data.status === "delivered" ? data.deliveredDate : "Đang giao",
    discount: data.discount,
    orderDate: data.orderDate,
    paid: data.paid,
    status:
      data.status === "pending"
        ? "Đang chờ"
        : data.status === "confirmed"
        ? "Đã xác nhận"
        : "Đã giao",
    total_price: data.total_price,
  });

  return (
    <>
      {/* lọc đơn theo tình trạng*/}
      {filter === data.status || filter === "all" ? (
        <div className="shoporderscard__container">
          <div className="shoporderscard__container--title">
            Mã đơn hàng: {order.id}
          </div>
          <div className="shoporderscard__container--content">
            <p className="card-text">Ngày đặt: {order.orderDate}</p>
            <p className="card-text">Tình trạng: {order.status}</p>
            <p className="card-text">
              Tổng thanh toán: {parseInt(order.paid).toLocaleString("vn-VN")} đ
            </p>
            <p className="card-text">
              Khuyến mãi: {parseInt(data.discount).toLocaleString("vn-VN")} đ
            </p>
            <p className="card-text">Ngày giao: {order.deliveredDate}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ShopOrdersCard;
