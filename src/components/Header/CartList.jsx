import "./css/nav.css";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
//import hooks
import useAuth from "hook/useAuth";
import useCart from "hook/useCart";
import useCartHandle from "hook/useCartHandle";

const CartList = () => {
  const { url } = useAuth();
  const { cartListProduct, setCartListProduct } = useCart();
  const { showCartList, delfromcart } = useCartHandle();

  useEffect(() => {
    showCartList();
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem("cartListProduct")) {
      showCartList();
    } else {
      setCartListProduct(
        JSON.parse(window.sessionStorage.getItem("cartListProduct"))
      );
    }
  }, []);

  return (
    <div>
      <div className="header__cart">
        <div className="header__cart-wrap">
          <Link to="/Cart">
            <i className="header__cart-icon">
              <BsCart2 />
            </i>
            <span className="header__cart-notice">
              {cartListProduct ? cartListProduct.length : "0"}
            </span>
          </Link>

          {/* <!-- No cart: header__cart-list--no-cart --> */}
          <div className="header__cart-list ">
            <img
              src="./img/no_cart.png"
              alt=""
              className="header__cart-no-cart-img"></img>
            <span className="header__cart-list-no-cart-msg">
              Chưa có sản phẩm
            </span>

            <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
            <ul className="header__cart-list-item">
              {cartListProduct && cartListProduct.length > 0 ? (
                cartListProduct.map((curElm, index) => {
                  return (
                    <li className="header__cart-item" key={index}>
                      <img
                        // src={`${url}/${curElm.image}`}
                        src={`http://0.tcp.ap.ngrok.io:15234/${curElm.image}`}
                        alt={curElm.name}
                        className="header__cart-img"></img>
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            {curElm.name}
                          </h5>
                          <div className="header__cart-item-price-wrap">
                            <span className="header__cart-item-price">
                              {parseInt(curElm.price).toLocaleString("vn-VN")} đ
                            </span>
                            <span className="header__cart-item-multiply">
                              x
                            </span>
                            <span className="header__cart-item-quantity">
                              {curElm.quantity_order}
                            </span>
                          </div>
                        </div>
                        <div className="header__cart-item-body">
                          <span className="header__cart-item-description">
                            {curElm.shopName}
                          </span>
                          <div
                            className="header__cart-item-remove"
                            onClick={() => delfromcart(curElm.id)}>
                            {/* <button onClick={() => delfromcart(curElm.id)}>Xóa</button> */}
                            xóa
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <p>Không có sản phẩm nào</p>
              )}
            </ul>

            <Link
              to="/Cart"
              className="header__cart-view-cart btn btn--primary-main">
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartList;
