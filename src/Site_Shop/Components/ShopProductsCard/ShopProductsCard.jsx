import { useState } from "react";

import "./ShopProductsCard.css";
const ShopProductsCard = ({ data, filter }) => {
  //status = [pending, confirmed, delivered]
  const [product, setProduct] = useState({
    id: 1,
    shop_id: 26,
    product_id: 98,
    price: "30000000.00",
    quantity: 3,
    starRated: null,
    status: 1,
    warranty: 24,
  });

  return (
    <>
      {/* lọc đơn theo tình trạng*/}
      {filter === data.status || filter === "all" ? (
        <div className="shopproductscard__container">
          <div className="shopproductscard__container--title">
            Mã đơn hàng: {product.id}
          </div>
          <div className="shopproductscard__container--content">
            <p className="card-text">Ngày đặt: {product.productDate}</p>
            <p className="card-text">Tình trạng: {product.status}</p>
            <p className="card-text">
              Tổng thanh toán: {parseInt(product.paid).toLocaleString("vn-VN")}{" "}
              đ
            </p>
            <p className="card-text">
              Khuyến mãi: {parseInt(data.discount).toLocaleString("vn-VN")} đ
            </p>
            <p className="card-text">Ngày giao: {product.deliveredDate}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ShopProductsCard;
