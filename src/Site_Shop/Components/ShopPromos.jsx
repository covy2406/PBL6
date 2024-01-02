import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ShopPromosCard from "./ShopPromosCard/ShopPromosCard";

const ShopPromos = ({ updateShopPromo, deleteShopPromo }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const [currentList, setCurrentList] = useState({});
  const [productpromosList, setProductPromosList] = useState({});
  const [shoppromosList, setShopPromosList] = useState({});

  useEffect(() => {
    setCurrentList(JSON.parse(window.sessionStorage.getItem("shopPromos")));
  }, []);

  useEffect(() => {
    setProductPromosList(currentList.promotions_shop_product_id);
    setShopPromosList(currentList.promotion_shop_id);
  }, [currentList]);

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
          <div className="shop__promos--type">Mã khuyến mãi của Shop</div>
          {Object.keys(shoppromosList).map((key) => {
            return (
              <ShopPromosCard
                data={shoppromosList[key]}
                filter={currentPath.split("/")[4]}
                updateShopPromo={updateShopPromo}
                deleteShopPromo={deleteShopPromo}
              />
            );
          })}
          <div className="shop__promos--type">Mã khuyến mãi Từng sản phẩm</div>
          {Object.keys(productpromosList).map((key) => {
            return (
              <ShopPromosCard
                data={productpromosList[key]}
                filter={currentPath.split("/")[4]}
                updateShopPromo={updateShopPromo}
                deleteShopPromo={deleteShopPromo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ShopPromos;
