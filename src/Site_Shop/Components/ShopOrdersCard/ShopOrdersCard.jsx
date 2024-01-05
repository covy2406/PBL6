import { useState } from "react";
import "./ShopOrdersCard.css";
import { getStatusFromEn } from "datas/statusData";

import useAuth from "hook/useAuth";
import useShop from "hook/useShop";

import { toast } from "react-toastify";

const ShopOrdersCard = ({ data, filter }) => {
  const { processShopOrder } = useShop();
  const { url } = useAuth();
  //, setOrder
  const [order, setOrder] = useState({
    id: data.id,
    orderDate: data.orderDate,
    status: data.status,
    paid: data.paid,
    deliveredDate: data.deliveredDate,
    discount: data.discount,
    discount_amount: data.discount_amount,
    created_at: data.created_at,
    updated_at: data.updated_at,
    customer_id: data.customer_id,
    shop_id: data.shop_id,
    total_price: data.total_price,
    customer_name: data.customer_name,
    name: data.name,
    image: data.image,
  });
  const handleConfirmed = async (e, id) => {
    const data = {
      order_id: id,
      status: "confirmed",
    };
    const res = processShopOrder(data);
    if (res) {
      setOrder({ ...order, status: "confirmed" });
      toast.success("Xác nhận đơn hàng thành công");
    } else {
      toast.error("Xác nhận đơn hàng thất bại");
    }
    e.preventDefault();
  };

  return (
    <>
      {/* lọc đơn theo tình trạng*/}
      {filter === order.status || filter === "all" ? (
        <>
          <div className="orderscard__container">
            <div className="orderscard__container--top">
              <div className="orderscard__shop">
                <div className="orderscard__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <div className="orderscard--customer-info">
                  {order.customer_name}
                </div>
              </div>
              <div className="orderscard__order--id">
                ID đơn hàng: {order.id}
              </div>
            </div>
            <div className="orderscard__product">
              <div className="orderscard__product--wrapper">
                <img
                  className="orderscard__product--image"
                  src={url + order.image}
                  alt=""></img>
                <div className="orderscard__product--name">{order.name}</div>
              </div>
              <div className="orderscard__product--wrapper">
                <div className="orderscard--total">
                  {parseInt(order.total_price).toLocaleString("vn-VN")} đ
                </div>
              </div>
              <div className="orderscard__product--status-wrapper">
                <div className="orderscard__product--status">
                  Tình trạng: {getStatusFromEn(order.status)}
                </div>
                {order.status === "pending" ? (
                  <button
                    className="orderscard__product--button"
                    onClick={(e) => handleConfirmed(e, order.id)}>
                    Xác nhận đơn hàng
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default ShopOrdersCard;
