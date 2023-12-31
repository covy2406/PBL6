import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import "./home.css";
import "../../assets/css/base.css";
import useCart from "hook/useCart";
import useAuth from "hook/useAuth";
import useCartHandle from "hook/useCartHandle";
//import { toast } from "react-toastify";

const ProductHome = () => {
  const { url, auth } = useAuth();
  const { view } = useCart();
  const { productList } = useCart();
  const { addtocart, fetchProductHome } = useCartHandle();

  useEffect(() => {
    fetchProductHome();
  }, []);

  return (
    <div className="container">
      {productList && productList.length > 0 ? (
        productList.map((curElm) => {
          return (
            <div className="box" key={curElm.shop_product_id}>
              <div className="img_box">
                <img
                  className="product-main__item"
                  src={`${url}${curElm.image}`}
                  alt={curElm.name}></img>
                <div className="icon">
                  {auth.isAuth ? (
                    <li onClick={() => addtocart(curElm.shop_product_id, 1)}>
                      <AiOutlineShoppingCart />
                    </li>
                  ) : null}
                  <li
                    className="icon__link"
                    onClick={() => view(curElm.shop_product_id)}>
                    <Link to={`Viewdetail/${curElm.shop_product_id}`}>
                      <BsEye />
                    </Link>
                  </li>
                </div>
              </div>
              <div className="detail">
                <h4 className="home-product-item__name">{curElm.name}</h4>
                <div className="home-product-item__description">
                  {curElm.details}
                </div>
                <div className="home-product-item__price">
                  <span className="home-product-item__price-current">
                    {parseInt(curElm.price).toLocaleString("vn-VN")} đ
                  </span>
                </div>
                <div className="home-product-item__action">
                  <div className="home-product-item__rating">
                    <i className="home-product-item__star--gold fas fa-star">
                      <AiOutlineStar />
                    </i>
                  </div>
                </div>

                <div className="home-product-item__origin">
                  <span className="home-product-item__brand">
                    Cửa hàng: {curElm.shopName}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <p>Không có sản phẩm nào</p>
          <p>{productList}</p>
        </div>
      )}
    </div>
  );
};
export default ProductHome;
