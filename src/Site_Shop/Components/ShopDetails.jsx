import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useShop from "hook/useShop";

const ShopDetails = () => {
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
            <li className="shop__home-item">Thông tin cửa hàng</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ShopDetails;
