import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/nav.css";
import { getStatusFromEn } from "datas/statusData";

import useShop from "hook/useShop";
const NavNotification = () => {
  const { getShopOrdersAll } = useShop();
  const [orderList, setOrderList] = useState({});
  useEffect(() => {
    getShopOrdersAll().then((res) => {
      setOrderList(res);
    });
  }, []);
  return (
    <>
      <ul className="header__notify-list">
        {Object.keys(orderList).map((key) => {
          return orderList[key].status === "pending" ? (
            <li
              key={key}
              className="header__notify-item header__notify-item--viewed">
              <Link to="/shop/orders/all" className="header__notify-link">
                <img
                  src="./img/dienthoai.jpg"
                  alt=""
                  className="header__notify-img"></img>
                <div className="header__notify-info">
                  <span className="header__notify-name">
                    {orderList[key].name}
                  </span>
                  <span className="header__notify-description">
                    Thông báo từ shop: {getStatusFromEn(orderList[key].status)}
                  </span>
                </div>
              </Link>
            </li>
          ) : null;
        })}
      </ul>
    </>
  );
};

export default NavNotification;
