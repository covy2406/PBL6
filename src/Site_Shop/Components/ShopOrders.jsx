import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useShop from "hook/useShop";
import ShopOrdersData from "Site_Shop/Data/ShopOrdersData";

const ShopOrders = () => {
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
            {ShopOrdersData.map((item, index) => {
              return (
                <li className="shop__home-item">
                  <Link
                    to={item.link}
                    className="shop__home-item-link"
                    id={currentPath === item.link ? "active" : "inactive"}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ShopOrders;
