import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/shopStyle.css";
import useShop from "hook/useShop";

//page import
import ShopOrders from "./Components/ShopOrders";
import ShopDetails from "./Components/ShopDetails";
import ShopProduct from "./Components/ShopProducts";
import ShopProductAdd from "./Components/ShopProductsAdd";

const Shop = ({ extraProps } = "details") => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const { getShopdetails } = useShop();

  useEffect(() => {
    const res = getShopdetails();
    console.log(res);
  }, []);

  useEffect(() => {
    console.log(extraProps.extraProps);
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="grid">
      <div className="shop__container">
        <div className="shop__container-sidebar">
          <ul className="sidebar-menu">
            <ul className="sidebar-menu__item">
              <h3>Quản lý đơn hàng</h3>
              <li className="sidbar-menu__item-link">
                <Link
                  to="/shop/orders/all"
                  className="shop__home-item-link"
                  id={currentPath === "/shop/orders/all" ? "active" : ""}>
                  Tất cả
                </Link>
              </li>
              <li className="sidbar-menu__item-link">
                <Link
                  to="/shop/orders/shipping"
                  className="shop__home-item-link"
                  id={currentPath === "/shop/orders/shipping" ? "active" : ""}>
                  Đang giao hàng
                </Link>
              </li>
              <li className="sidbar-menu__item-link">
                <Link
                  to="/shop/orders/delivered"
                  className="shop__home-item-link"
                  id={currentPath === "/shop/orders/delivered" ? "active" : ""}>
                  Đã giao hàng
                </Link>
              </li>
            </ul>
            <ul className="sidebar-menu__item">
              <h3>Quản lý sản phẩm</h3>
              <li className="sidbar-menu__item-link">
                <Link
                  to="/shop/products/list/all"
                  className="shop__home-item-link"
                  id={
                    currentPath === "/shop/products/list/all" ? "active" : ""
                  }>
                  Tất cả sản phẩm
                </Link>
              </li>
              <li className="sidbar-menu__item-link">
                <Link
                  to="/shop/products/add"
                  className="shop__home-item-link"
                  id={currentPath === "/shop/products/add" ? "active" : ""}>
                  Thêm sản phẩm
                </Link>
              </li>
            </ul>
            <ul className="sidebar-menu__item">
              <h3>Khuyến mãi</h3>
              <li className="sidbar-menu__item-link">
                <Link
                  to="/shop/promos/list/all"
                  className="shop__home-item-link"
                  id={currentPath === "/shop/promos/list/all" ? "active" : ""}>
                  Danh sách khuyến mãi
                </Link>
              </li>
              <li className="sidbar-menu__item-link">
                <Link
                  to="/shop/promos/add"
                  className="shop__home-item-link"
                  id={currentPath === "/shop/promos/add" ? "active" : ""}>
                  Thêm khuyến mãi
                </Link>
              </li>
            </ul>
            <ul className="sidebar-menu__item">
              <h3>Hồ sơ shop</h3>
              <li className="sidbar-menu__item-link">
                <Link
                  to="/shop/details"
                  className="shop__home-item-link"
                  id={currentPath === "/shop/details" ? "active" : "inactive"}>
                  Hồ sơ shop
                </Link>
              </li>
            </ul>
          </ul>
        </div>
        {extraProps === "details" ? (
          <ShopDetails />
        ) : extraProps === "orders" ? (
          <ShopOrders />
        ) : extraProps === "add" ? (
          <ShopProductAdd />
        ) : extraProps === "products" ? (
          <ShopProduct />
        ) : null}
      </div>
    </div>
  );
};
export default Shop;
