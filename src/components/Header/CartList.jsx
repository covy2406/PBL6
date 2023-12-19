import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import "./css/nav.css";
//import hooks
import useCart from "hook/useCart";
import useCartHandle from "hook/useCartHandle";

const CartList = () => {
    const { cartListProduct, setCartListProduct } = useCart();
    const { showCartList } = useCartHandle();

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
                                cartListProduct.map((curElm) => {
                                    return (
                                        <li className="header__cart-item" key={curElm.id}>
                                            <img
                                                src={`http://0.tcp.ap.ngrok.io:14557/${curElm.image}`}
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
                                                        {curElm.brand}
                                                    </span>
                                                    {/* <span className="header__cart-item-remove"><button onClick={() => removeproduct(curElm)}>Xóa</button></span> */}
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
                            className="header__cart-view-cart btn btn--primary">
                            Xem giỏ hàng
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartList;
