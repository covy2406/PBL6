import "./css/cart.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useCart from "hook/useCart";

//import lib
import { toast } from "react-toastify";
//import icon

import { CiDiscount1 } from "react-icons/ci";
//import api
import apiHandlePayment from "api/apiHandlePayment";
//import pages
import ProductOrderCard from "./ProductOrderCard";

import ShopPromoList from "./ShopPromoList";
import DiscountListWeb from "./DiscountListWeb";
import Swal from "sweetalert2";

const Cart = () => {
  //handle when get cart
  const { cartListProduct } = useCart();

  const [Totalprice, setTotalprice] = useState(0);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [discountWeb, setDiscountWeb] = useState([]);

  const toggleDiscounts = () => {
    setShowDiscounts(!showDiscounts);
  };

  useEffect(() => {
    const fetchDiscountWeb = async () => {
      try {
        const res = await apiHandlePayment.getDiscountWeb();
        setDiscountWeb(
          res.data.data.map((item) => ({ ...item, checked: false }))
        );
      } catch (error) {
        console.error("Lỗi khi lấy mã giảm giá của Web", error);
      }
    };
    fetchDiscountWeb();
  }, []);

  // Tạo một mảng để tổ chức danh sách sản phẩm theo shop
  const [shopsFilter, setShopFilter] = useState([]);

  // Tổ chức danh sách sản phẩm theo shop
  useEffect(() => {
    const newFilter = cartListProduct.reduce((acc, productItem) => {
      const existingShopIndex = acc.findIndex(
        (shop) => shop.shopId === productItem.shop_id
      );
      if (existingShopIndex !== -1) {
        acc[existingShopIndex].products.push(productItem);
      } else {
        acc.push({
          shopId: productItem.shop_id,
          shopName: productItem.shopName,
          products: [productItem],
          shop_product_id: productItem.shop_product_id,
          shop_total_price: 0,
        });
      }
      return acc;
    }, []);
    setShopFilter(newFilter);
  }, []);
  console.log(discountWeb);
  // Tính tổng giá trị của các sản phẩm được chọn

  const discountTotal = useRef(0);

  useEffect(() => {
    const selectedTotal = shopsFilter.reduce((total, shop) => {
      return (
        total +
        shop.products.reduce((total, product) => {
          if (product.checked === true)
            return total + product.total_price - product.discount_amount;
          return total;
        }, 0)
      );
    }, 0);
    discountTotal.current = discountWeb.reduce((total, discount) => {
      if (discount.checked === true) {
        if (discount.type === 1)
          return (
            total + (parseInt(discount.value) * parseInt(selectedTotal)) / 100
          );
        return total + parseInt(discount.value);
      }
      return total;
    }, 0);
    console.log(discountTotal.current, selectedTotal);
    setTotalprice(selectedTotal - discountTotal.current);
  }, [shopsFilter, discountWeb]);

  const handleVNpay = async () => {
    const vnp_OrderInfo = "";
    const vnp_Amount = Totalprice;
    const response = await apiHandlePayment.VNPay(vnp_OrderInfo, vnp_Amount);
    console.log(response);
    if (response && response.data.data) {
      window.open(response.data.data, "_blank");
    }
  };

  const handlePayment = async (type) => {
    Swal.fire({}).then((result) => {
      if (result.isConfirmed) {
        let data = [];
        shopsFilter.map((shop) => {
          shop.products.map((product) => {
            if (product.checked === true) {
              data.push({
                product_order_id: product.id,
                code_discount: product.code_discount.join(","),
                discount_amount: product.discount_amount,
                total_price: product.total_price - product.discount_amount,
              });
            }
          });
        });
        const checkedDiscounts = discountWeb.filter(
          (discount) => discount.checked
        );
        apiHandlePayment.CashPay(data, 0, checkedDiscounts[0]?.code);
        if (type === "onl") handleVNpay();
        Swal.fire({
          icon: "success",
          title: "Đặt hàng thành công",
          text: "Cảm ơn bạn đã mua hàng tại 4B1G",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <div className="cartcontainer">
        <div className="grid">
          {cartListProduct.length === 0 ? (
            <div className="emptycart">
              <h2 className="empty">Cart is Empty</h2>
              <Link to="/product" className="emptycartbtn">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="contant">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Chọn</th>
                    <th>sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {shopsFilter.map((shop, index) => (
                    <>
                      <tr className="shopNameRow" key={index}>
                        <td colSpan="7">shop: {shop.shopName}</td>
                      </tr>
                      {shop.products.map((productItem, index) => (
                        <tr key={index}>
                          <ProductOrderCard
                            props={{ productItem: productItem, shop: shop }}
                            func={{
                              setShopFilter: setShopFilter,
                            }}
                          />
                        </tr>
                      ))}
                      <tr className="shop_promotion">
                        <td colSpan="7">
                          <div className="discount__byShop">
                            <span className="discount__byShop-icon">
                              <CiDiscount1 />
                            </span>
                            <div className="discount__byShop-ad">
                              <div className="btn__checkout-discount-shop-cover"></div>
                              <div className="btn__checkout-discount-shop">
                                Mã giảm giá của Shop
                                <ShopPromoList
                                  props={{
                                    shop_id: shop.shopId,
                                    shop_total_price: shop.shop_total_price,
                                  }}
                                  func={{
                                    setShopFilter: setShopFilter,
                                  }}
                                />
                              </div>
                            </div>
                            <div className="shop--total-price">
                              {parseInt(shop.shop_total_price).toLocaleString(
                                "vn-VN"
                              )}{" "}
                              đ
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <div className="cart__totalprice">
                <h2 className="totalprice">
                  Tổng: {Totalprice.toLocaleString("vn-VN")} đ
                </h2>
                <button
                  className="btn__checkout"
                  onClick={() => handlePayment("onl")}>
                  Mua online
                </button>
                <button
                  className="cash__payment"
                  onClick={() => handlePayment("off")}>
                  Thanh toán bằng tiền mặt
                </button>
                <button
                  className="btn__checkout-discount-web"
                  onClick={() => toggleDiscounts()}>
                  Chọn mã giảm giá của 4B1G
                </button>
                {showDiscounts ? (
                  <DiscountListWeb
                    props={{ discountWeb: discountWeb }}
                    func={{ setDiscountWeb: setDiscountWeb, setShowDiscounts }}
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
