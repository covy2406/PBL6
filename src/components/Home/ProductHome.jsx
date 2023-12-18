import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import "./home.css";
import apiProductHome from "api/apiProductHome";
import useCart from "hook/useCart";
import useAuth from "hook/useAuth";
import useCartHandle from "hook/useCartHandle";
import { toast } from "react-toastify";

// import apiAddToCart from 'api/apiAddToCart';
// import { useParams } from 'react-router-dom';
//import { toast } from 'react-toastify';

const ProductHome = () => {
  const { auth } = useAuth();
  const { view } = useCart();
  const { addtocart } = useCartHandle();

  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductHome = async () => {
      try {
        const response = await apiProductHome.getAll();
        setProductList(response.data);
      } catch (error) {
        setError(error);
        toast.error(error?.message);
      }
    };
    fetchProductHome();
  }, []);
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container">
      {/* <p >{productList}</p> */}
      {productList && productList.length > 0 ? (
        // Array.isArray(productList) ? or productList && productList.lenght > 0 ? đều kiểm tra xem có phải dữ liệu từ api là mảng hay ko.
        productList.map((curElm) => {
          return (
            <div className="box" key={curElm.shop_product_id}>
              {curElm.shop_product_id}
              <div className="img_box">
                <img
                  className="product-main__item"
                  src={`http://0.tcp.ap.ngrok.io:19947/${curElm.image}`}
                  alt={curElm.name}></img>
                <div className="icon">
                  {auth.isAuth ? (
                    <li onClick={() => addtocart(curElm.shop_product_id, 1)}>
                      <AiOutlineShoppingCart />
                    </li>
                  ) : (
                    <li>
                      <AiOutlineShoppingCart />
                    </li>
                  )}
                  <li
                    className="icon__link"
                    onClick={() => view(curElm.shop_product_id)}>
                    <Link to={`Viewdetail/${curElm.shop_product_id}`}>
                      <BsEye />
                    </Link>
                  </li>
                </div>
              </div>
              <div className="detail">
                <h4 className="home-product-item__name">{curElm.name}</h4>
                <div className="home-product-item__description">
                  {curElm.detail}
                </div>
                <div className="home-product-item__price">
                  <span className="home-product-item__price-old"></span>
                  <span className="home-product-item__price-current">
                    {parseInt(curElm.price).toLocaleString("vn-VN")} đ
                  </span>
                </div>

                <div className="home-product-item__origin">
                  <span className="home-product-item__brand">
                    {curElm.shopName}
                  </span>
                  <span className="home-product-item__origin-name"></span>
                </div>
                {/* {
                                        shop &&
                                        <div className="home-product-item__origin">
                                            <span className="home-product-item__brand">{shop.shopName}</span>
                                            <span className="home-product-item__origin-name">{shop.shopAddress}</span>
                                        </div>
                                    } */}
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <p>Không có sản phẩm nào</p>
          <p>{productList}</p>
        </div>
      )}
    </div>
  );
};
export default ProductHome;
