import "./css/cart.css";
import { useEffect, useState } from "react";
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

const Cart = () => {
  //handle when get cart
  const { cartListProduct, setCartListProduct } = useCart();
  // Tạo một state để lưu trữ các sản phẩm được chọn trong giỏ hàng
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [Totalprice, setTotalprice] = useState(0);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const toggleDiscounts = () => {
    setShowDiscounts(!showDiscounts);
  };
  // Tính tổng giá trị của các sản phẩm được chọn
  useEffect(() => {
    console.log("totol run");
    const selectedTotal = selectedProducts?.reduce((price, item) => {
      return price + item.total_price - item.discount_amount;
    }, 0);
    setTotalprice(selectedTotal ? selectedTotal : 0);
  }, [selectedProducts, cartListProduct]);
  console.log("selectedProducts", selectedProducts);

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
  }, [cartListProduct, selectedProducts]);

  // Hàm xử lý thanh toán online
  const handlePayment = async (vnp_OrderInfo, vnp_Amount) => {
    // Hàm này sử dụng filter để lọc ra các sản phẩm từ cartListProduct
    // mà người dùng đã chọn(được lưu trong selectedProducts).
    // selectedItems sẽ chứa danh sách các sản phẩm được chọn để thanh toán
    const selectedItems = cartListProduct.filter(
      (item) => selectedProducts[item.id]
    );
    console.log("Item được chọn khi thanh toán:", selectedItems);
    if (selectedItems.length === 0) {
      toast.error("Vui long chon it nhat 1 san pham", { autoClose: 1000 });
      return;
    }
    // Mục đích của totalAmount ở đây có thể là để tính tổng giá trị của các sản phẩm được chọn
    // khi người dùng quyết định thực hiện thanh toán.
    // Có thể được sử dụng để xây dựng thông tin thanh toán
    const totalAmount = selectedItems
      ? selectedItems.reduce((total, item) => {
          return total + item.price * item.quantity_order;
        }, 0)
      : 0;
    console.log("totalAmount: ", totalAmount);

    // Lưu thông tin thanh toán vào sessionStorage
    const paymentInfo = {
      vnp_OrderInfo: "Thông tin đơn hàng",
      vnp_Amount: totalAmount,
    };

    window.sessionStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));

    try {
      const res = await apiHandlePayment.getPayment(
        paymentInfo.vnp_OrderInfo,
        paymentInfo.vnp_Amount
      );
      // // chuyển hướng đến trang thanh toán
      // window.location.href = res.data.data;
      window.location.replace(res.data.data);
    } catch (error) {
      console.error("Lỗi khi gửi thông tin đến api", error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau", { autoClose: 1000 });
    }
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
                              setCartListProduct: setCartListProduct,
                              setSelectedProducts: setSelectedProducts,
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
                              <div className="btn__checkout-discount-shop">
                                Mã giảm giá của Shop
                                <ShopPromoList
                                  props={{
                                    shop_id: shop.shopId,
                                  }}
                                  func={{
                                    setTotalprice: setTotalprice,
                                    setSelectedProducts: setSelectedProducts,
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              {" "}
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
                  total: {Totalprice.toLocaleString("vn-VN")} đ
                </h2>
                <button
                  className="btn__checkout"
                  onClick={() => handlePayment()}>
                  Mua online
                </button>
                <button className="cash__payment">
                  Thanh toán bằng tiền mặt
                </button>

                <button
                  className="btn__checkout-discount-web"
                  onClick={() => toggleDiscounts()}>
                  Chọn mã giảm giá của 4B1G
                </button>
                {showDiscounts && <DiscountListWeb />}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
