import "./css/cart.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//import useCartHandle from "hook/useCartHandle";
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

  const [cartListProduct, setCartListProduct] = useState(
    JSON.parse(localStorage.getItem("cartListProduct"))
  );

  const [Totalprice, setTotalprice] = useState(0);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [discountWeb, setDiscountWeb] = useState([]);

  // Lấy mã giảm giá của Web
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

  const [shopsFilter, setShopFilter] = useState([]);
  // Save to local storage whenever shopsFilter changes

  useEffect(() => {
    // Flatten the products from all shops into a single array
    const allProducts = shopsFilter.flatMap((shop) => shop.products);
    // Update cartListProduct state
    setCartListProduct(allProducts);
    // Save to local storage
    window.sessionStorage.setItem(
      "cartListProduct",
      JSON.stringify(allProducts)
    );
  }, [shopsFilter]);

  // Save to local storage whenever shopsFilter changes
  useEffect(() => {
    localStorage.setItem("shopsFilter", JSON.stringify(shopsFilter));
  }, [shopsFilter]);

  // Load from local storage when component mounts
  useEffect(() => {
    const savedShopsFilter = localStorage.getItem("shopsFilter");
    if (savedShopsFilter) {
      setShopFilter(JSON.parse(savedShopsFilter));
    }
  }, []);
  // Tạo một mảng để tổ chức danh sách sản phẩm theo shop

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

  // toggle web discounts
  const toggleDiscounts = () => {
    const isAnyProductChecked = shopsFilter.some((shop) =>
      shop.products.some((product) => product.checked === true)
    );
    if (!isAnyProductChecked) {
      toast.error("Vui lòng chọn sản phẩm");
    }
    setShowDiscounts(isAnyProductChecked);
  };

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
    setTotalprice(selectedTotal - discountTotal.current);
  }, [shopsFilter, discountWeb]);
  // handle online payment
  const handleVNpay = async (data, type, code) => {
    const vnp_OrderInfo = "";
    const vnp_Amount = Totalprice;

    const response = await apiHandlePayment.VNPay(vnp_OrderInfo, vnp_Amount); // gọi api vnpay trước
    window.open(response.data.data, "_self"); //điền link trả về từ api vào đây
    window.onfocus = async function () {
      toast.info("Đang kiểm tra trạng thái thanh toán...", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
      await apiHandlePayment.CashPay(data, type, code); // gọi api thanh toán
      const params = new URLSearchParams(window.location.search); // lấy params trên url
      const vnp_ResponseCode = params.get("vnp_ResponseCode");
      if (vnp_ResponseCode === "00") {
        toast.success("Thanh toán thành công!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
        const newShopsFilter = shopsFilter.map((shop) => {
          return {
            ...shop,
            products: shop.products.filter((product) => !product.checked),
          };
        });
        setShopFilter(newShopsFilter);
      }
    };
  };

  // handle all payment
  const handlePayment = async (type) => {
    if (Totalprice === 0) {
      toast.error("Vui lòng chọn sản phẩm");
      return;
    }
    Swal.fire({
      title: "Xác nhận thanh toán",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        // get data to handle payment
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
        // get discount code
        const checkedDiscounts = discountWeb.filter(
          (discount) => discount.checked
        );
        // vnpay if online payment
        if (type === "onl") handleVNpay(data, 1, checkedDiscounts[0]?.code);
        else {
          apiHandlePayment.CashPay(data, 0, checkedDiscounts[0]?.code);
          Swal.fire({
            icon: "success",
            title: "Đặt hàng thành công",
            text: "Cảm ơn bạn đã mua hàng tại 4B1G",
            showConfirmButton: false,
            timer: 1500,
          });
          // Remove the selected products from the cart
          const newShopsFilter = shopsFilter.map((shop) => {
            return {
              ...shop,
              products: shop.products.filter((product) => !product.checked),
            };
          });
          setShopFilter(newShopsFilter);
        }
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
                {shopsFilter.map((shop, index) => (
                  <tbody key={index}>
                    <tr className="shopNameRow" key={index}>
                      <td colSpan="7">shop: {shop.shopName}</td>
                    </tr>
                    {shop.products.map((productItem, index) => (
                      <tr key={index}>
                        <ProductOrderCard
                          props={{ productItem: productItem, shop: shop }}
                          func={{
                            setShopFilter: setShopFilter,
                            setDiscountWeb: setDiscountWeb,
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
                  </tbody>
                ))}
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
                  className="btn__checkout"
                  onClick={() => handlePayment("off")}>
                  Thanh toán bằng tiền mặt
                </button>
                <button
                  className="btn__checkout"
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
