import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ShopOrdersData from "Site_Shop/Data/ShopOrdersData";
import ShopOrdersCard from "./ShopOrdersCard/ShopOrdersCard";

const ShopOrders = ({ props }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const [orderList, setOrderList] = useState({});

  useEffect(() => {
    setOrderList(JSON.parse(window.sessionStorage.getItem("shopOrders")));
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
                <li key={index} className="shop__home-item">
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
      <div className="shop__menu_details">
        <div className="shop__orders--list">
          {Object.keys(orderList).map((item) => {
            return (
              <ShopOrdersCard
                key={item}
                data={orderList[item]}
                filter={currentPath.split("/")[3]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ShopOrders;
