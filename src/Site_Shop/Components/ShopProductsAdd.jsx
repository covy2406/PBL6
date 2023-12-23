import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useShop from "hook/useShop";

const ShopProductAdd = () => {
  return (
    <div className="shop__container-nav">
      <div className="shop__menu_container">
        <div className="shop__home">
          <ul className="shop__home-list">
            <li className="shop__home-item">Thêm sản phẩm</li>
          </ul>
        </div>
      </div>
      <div className="shop__content">
        <div className="shop__content__list"></div>
      </div>
    </div>
  );
};
export default ShopProductAdd;
