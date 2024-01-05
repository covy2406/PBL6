import "./css/ViewDetailShop.css";
import React from "react";
import {
  AiOutlineDown,
  AiOutlineShoppingCart,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiShop from "api/apiShop";
import useAuth from "hook/useAuth";
import useCartHandle from "hook/useCartHandle";
import useCart from "hook/useCart";

const ViewdetailShop = ({ shopName }) => {
  const [shopProduct, setShopProduct] = useState([]);
  const { id } = useParams();

  const { auth, url } = useAuth();
  const { addtocart } = useCartHandle();
  const { view } = useCart();

  useEffect(() => {
    const fetchShopProduct = async () => {
      try {
        const res = await apiShop.getAllShopProduct();
        setShopProduct(res.data.data);
      } catch (err) {
        console.error("Lỗi không thể gọi được api", err);
      }
    };
    fetchShopProduct(id);
  }, [id]);
  console.log(shopName);

  return (
    <>
      <div className="container__shop">
        <div className="grid">
          <div className="container__shop-menu">
            <ul className="shop-menu__list">
              <div className="shopdetails--name">{shopName}</div>
            </ul>
          </div>
          <div className="product">
            <div className="container">
              {shopProduct && shopProduct.length > 0 ? (
                shopProduct.map((itemProduct, index) => {
                  return (
                    <div className="box" key={index}>
                      <div className="img_box">
                        <img
                          className="product-main__item"
                          src={`${url}${itemProduct.image}`}
                          alt={itemProduct.name}></img>
                        <div className="icon">
                          {auth.isAuth ? (
                            <li onClick={() => addtocart(itemProduct.id, 1)}>
                              <AiOutlineShoppingCart />
                            </li>
                          ) : (
                            <li>
                              <AiOutlineShoppingCart />
                            </li>
                          )}
                          {/* {`../Viewdetail/${item.id}`} */}
                          {/* <Link to={`../Viewdetail/${item.id}`}><BsEye /></Link> */}
                          <li
                            className="icon__link"
                            onClick={() => view(itemProduct.id)}>
                            <Link to={`../Viewdetail/${itemProduct.id}`}>
                              <BsEye />
                            </Link>
                          </li>
                        </div>
                      </div>
                      <div className="detail">
                        <h4 className="home-product-item__name">
                          {itemProduct.name}
                        </h4>
                        <div className="home-product-item__price">
                          <span className="home-product-item__price-old"></span>
                          <span className="home-product-item__price-current">
                            {parseInt(itemProduct.price).toLocaleString(
                              "vn-VN"
                            )}{" "}
                            đ
                          </span>
                        </div>

                        <div className="home-product-item__origin">
                          <span className="home-product-item__brand">
                            {itemProduct.shopName}
                          </span>
                          <span className="home-product-item__origin-name">
                            {/* {itemProduct.starRated}  <AiOutlineStar /> */}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  <p>Không có sản phẩm nào</p>
                  <p>{shopProduct}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewdetailShop;
