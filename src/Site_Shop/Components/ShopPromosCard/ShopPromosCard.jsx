import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "hook/useAuth";

const ShopPromosCard = ({ data, filter }) => {
  const { auth } = useAuth();
  const [product, setProduct] = useState({
    id: data.id,
    shop_id: data.shop_id,
    product_id: data.product_id,
    price: data.price,
    quantity: data.quantity,
    starRated: data.starRated,
    status: data.status ? "Hoạt động" : "Không hoạt động",
    isNew: data.isNew,
    warranty: data.warranty,
    description: data.description,
    created_at: data.created_at,
    updated_at: data.updated_at,
    image: data.image,
    name: data.name,
  });
  return (
    <>
      {/* lọc đơn theo tình trạng*/}
      {filter === data.status ? (
        "active"
      ) : "inactive" || filter === "all" ? (
        <>
          <div className="productscard__container">
            <div className="productscard__product-name">
              <img
                src={auth.url + product.image}
                alt=""
                className="productscard__product-name--img"
              />
              <div className="productscard__product-name--text">
                {product.name}
              </div>
            </div>
            <div className="productscard__product-price">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </div>
            <div className="productscard__product-quantity">
              Kho: {product.quantity}
            </div>
            <div className="productscard__product-button-list">
              <button className="productscard__product--button">Sửa</button>
              <Link
                to={`/Viewdetail/${product.id}`}
                className="productscard__product-button">
                Xem thêm
              </Link>
            </div>
            <div className="productscard__product-starrate">
              <div className="productscard__product-starrate--text">
                Đánh giá:
              </div>
              <div className="productscard__product-starrate--star">
                {[...Array(product.starRated)].map((item, index) => {
                  return (
                    <>
                      <div className="productscard__product-starrate--star--icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="red"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                          />
                        </svg>
                      </div>
                    </>
                  );
                })}
                {[...Array(5 - product.starRated)].map((item, index) => {
                  return (
                    <>
                      <div className="productscard__product-starrate--star--icon">
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
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                          />
                        </svg>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ShopPromosCard;
