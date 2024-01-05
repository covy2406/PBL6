import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ShopPromosCard from "./ShopPromosCard/ShopPromosCard";

const ShopPromos = (props) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const [productpromosList, setProductPromosList] = useState({});
  const [shoppromosList, setShopPromosList] = useState({});

  useEffect(() => {
    setProductPromosList(
      JSON.parse(window.sessionStorage.getItem("shopPromos"))
        .promotions_shop_product_id
    );
    setShopPromosList(
      JSON.parse(window.sessionStorage.getItem("shopPromos")).promotion_shop_id
    );
  }, []);

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
          {shoppromosList ? (
            <>
              <div className="shop__promos--type">Mã khuyến mãi của Shop</div>
              {Object.keys(shoppromosList).map((key) => {
                return (
                  <ShopPromosCard
                    props={{
                      productpromosList: productpromosList[key],
                      filter: currentPath.split("/")[4],
                    }}
                    key={key}
                  />
                );
              })}
            </>
          ) : (
            <div className="shop__promos--type">
              Không có khuyến mãi của Shop
            </div>
          )}
          {productpromosList ? (
            <>
              <div className="shop__promos--type">
                Mã khuyến mãi Từng sản phẩm
              </div>
              {Object.keys(productpromosList).map((key) => {
                return (
                  <ShopPromosCard
                    props={{
                      productpromosList: productpromosList[key],
                      filter: currentPath.split("/")[4],
                    }}
                    key={key}
                  />
                );
              })}
            </>
          ) : (
            <div className="shop__promos--type">
              Không có khuyến mãi của sản phẩm
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ShopPromos;
