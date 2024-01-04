import "./css/AdminProductStyle.css";
import useAdmin from "hook/useAdmin";
import { useEffect, useState } from "react";
// import { AiOutlineDown, AiOutlineShoppingCart, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import { AiOutlineStar } from "react-icons/ai";
import { Link, useParams } from 'react-router-dom';
// import useCartHandle from "hook/useCartHandle";
import useCart from "hook/useCart";
import useAuth from "hook/useAuth";

function AdminProduct() {
  const { url } = useAuth();
  // const { addtocart } = useCartHandle();
  const { view } = useCart();
  const { id } = useParams();
  const { getAllShopProduct } = useAdmin();
  const [shopProductList, setShopProductList] = useState([]);
  useEffect(() => {
    getAllShopProduct().then((res) => {
      console.log(res);
      setShopProductList(res.data);
    });
  }, []);

  return (
    <>
      <div className="grid">
        <div className="admin__top--title">Danh sách sản phẩm của các shop</div>
        <div className="admin__product-wrap">
          <div className="admin__body-list">
            {Object.keys(shopProductList).map((itemProduct, index) => {
              return (
                  <Link className="Admin__link-detail" to={`../../Viewdetail/${itemProduct.id}`}>
                  <li className="header__cart-item icon__link"onClick={() => view(itemProduct.id)} key={index}>
                      <img
                        src={`${url}${shopProductList[itemProduct].image}`}
                        alt={shopProductList[itemProduct].name}
                        className="header__cart-img"></img>
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            {shopProductList[itemProduct].name}
                          </h5>
                          <div className="header__cart-item-price-wrap">
                            <span className="header__cart-item-price">
                              {parseInt(
                                shopProductList[itemProduct].price
                              ).toLocaleString("vn-VN")}{" "}
                              đ
                            </span>
                            <span className="header__cart-item-multiply"></span>
                            <span className="header__cart-item-quantity">
                              {/* {shopProductList[itemProduct].quantity_order} */}
                            </span>
                          </div>
                        </div>
                        <div className="header__cart-item-body">
                          <span className="header__cart-item-description">
                            {shopProductList[itemProduct].description}
                          </span>
                          <div className="header__cart-item-remove"></div>
                        </div>
                      </div>
                  </li>
                  </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminProduct;
