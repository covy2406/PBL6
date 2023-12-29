import { useEffect } from "react";
import { Link } from "react-router-dom";

import useShop from "hook/useShop";
const NavNotification = () => {
  const { getShopOrdersAll } = useShop();
  useEffect(() => {
    getShopOrdersAll().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <ul className="header__notify-list">
        <li className="header__notify-item header__notify-item--viewed">
          <Link to="/" className="header__notify-link">
            <img
              src="./img/dienthoai.jpg"
              alt=""
              className="header__notify-img"></img>
            <div className="header__notify-info">
              <span className="header__notify-name">
                Xác thực chính hãng nguồn gốc sản phẩm Ohui
              </span>
              <span className="header__notify-description">
                Xác thực chính xác nguồn gốc sản phẩm Ohui
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavNotification;
