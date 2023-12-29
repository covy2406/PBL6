import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ShopPromosCard from "./ShopPromosCard/ShopPromosCard";

const ShopPromos = ({ extraProps } = "all") => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const [promosList, setPromosList] = useState({});

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="shop__container-nav">
      <div className="shop__menu_container">
        <div className="shop__home">
          <ul className="shop__home-list">
            <li className="shop__home-item">
              <Link
                to="/shop/promos/list/all"
                className="shop__home-item-link"
                id={
                  currentPath === "/shop/promos/list/all"
                    ? "active"
                    : "inactive"
                }>
                Tất cả khuyến mãi
              </Link>
            </li>
            <li className="shop__home-item">
              <Link
                to="/shop/promos/list/active"
                className="shop__home-item-link"
                id={
                  currentPath === "/shop/promos/list/active"
                    ? "active"
                    : "inactive"
                }>
                Khuyến mãi đang hoạt động
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="shop__menu_details">
        <div className="shop__orders--list">
          {Object.keys(promosList).map((key) => {
            return (
              <ShopPromosCard
                data={promosList[key]}
                filter={currentPath.split("/")[4]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ShopPromos;
