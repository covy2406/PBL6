import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useShop from "hook/useShop";
import ShopOrdersData from "Site_Shop/Data/ShopOrdersData";

import ShopOrdersCard from "./ShopOrdersCard/ShopOrdersCard";

const ShopOrders = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const { getShopOrdersAll } = useShop();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const res = getShopOrdersAll();
    if (res) {
      setOrderList(JSON.parse(window.sessionStorage.getItem("orderList")));
    }
  }, []);

  useEffect(() => {
    console.log(orderList);
    console.log(typeof orderList);
  }, [orderList]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  //test data
  const [order, setOrder] = useState({
    id: 1,
    deliveredDate: "10-10-2021",
    discount: 0,
    orderDate: "10-10-2021",
    paid: 1000000,
    status: "pending",
    total_price: 0,
  });
  return (
    <div className="shop__container-nav">
      <div className="shop__menu_container">
        <div className="shop__home">
          <ul className="shop__home-list">
            {ShopOrdersData.map((item) => {
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
      <div className="shop__orders--list">
        <div className="row">
          <ShopOrdersCard data={order} filter={currentPath.split("/")[3]} />
        </div>
      </div>
    </div>
  );
};
export default ShopOrders;
