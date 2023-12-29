import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ShopProductsCard from "./ShopProductsCard/ShopProductsCard";

const ShopProduct = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const [productList, setProductList] = useState({});

  useEffect(() => {
    setProductList(JSON.parse(window.sessionStorage.getItem("shopProducts")));
  }, []);

  useEffect(() => {
    console.log(productList);
  }, [productList]);

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
                to="/shop/products/list/all"
                className="shop__home-item-link"
                id={
                  currentPath === "/shop/products/list/all"
                    ? "active"
                    : "inactive"
                }>
                Tất Cả sản phẩm
              </Link>
            </li>
            <li className="shop__home-item">
              <Link
                to="/shop/products/list/active"
                className="shop__home-item-link"
                id={
                  currentPath === "/shop/products/list/active"
                    ? "active"
                    : "inactive"
                }>
                Sản phẩm đang bán
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="shop__menu_details">
        <div className="shop__orders--list">
          {Object.keys(productList).map((key) => {
            return (
              <ShopProductsCard
                data={productList[key]}
                filter={currentPath.split("/")[4]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ShopProduct;
