import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useShop from "hook/useShop";

const ShopPromosAdd = ({ extraProps } = "all") => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const { getShopdetails } = useShop();

  useEffect(() => {
    const res = getShopdetails();
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="shop__container-nav">
      <div className="shop__menu_container">
        <div className="shop__home">
          <ul className="shop__home-list">
            <li className="shop__home-item">Thêm khuyến mãi</li>
          </ul>
        </div>
      </div>
      <div className="shop__content">
        <div className="shop__content__list"></div>
      </div>
    </div>
  );
};
export default ShopPromosAdd;
