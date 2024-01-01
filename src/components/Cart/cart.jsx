import "./css/cart.css";
//import "../../assets/css/base.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCart from "hook/useCart";
import useCartHandle from "hook/useCartHandle";
import useAuth from "hook/useAuth";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";
import apiHandlePayment from "api/apiHandlePayment";
import DiscountListShop from "./DiscountListShop";
import DiscountListWeb from "./DiscountListWeb";

const Cart = () => {
  const { auth } = useAuth();
  const { cartListProduct, setCartListProduct } = useCart();
  const { decreaseQuantity, increaseQuantity, delfromcart } = useCartHandle();

  const [selectedProducts, setSelectedProducts] = useState({});
  const [productQuantities, setProductQuantities] = useState({});
  const [shop_product_id_list, setShopProductIdList] = useState([]);

  const [Totalprice, setTotalprice] = useState(0);

  const [showDiscounts, setShowDiscounts] = useState(false);

  const toggleDiscounts = () => {
    setShowDiscounts(!showDiscounts);
  };

  // Hàm xử lý sự kiện khi chọn checkbox để chọn sản phẩm trong giỏ hàng
  const handleCheckboxChange = (id) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [id]: !prevSelectedProducts[id],
    }));
  };

  //   useEffect(() => {
  //     cartListProduct.map((product) => {
  //       setShopProductIdList((prevList) => [...prevList, product.id]);
  //     });
  //   }, [cartListProduct]);

  // Tính tổng giá trị của các sản phẩm được chọn
  useEffect(() => {
    const selectedTotal = cartListProduct.reduce((price, item) => {
      if (selectedProducts[item.id]) {
        return price + parseInt(item.price) * item.quantity_order;
      }
      return price;
    }, 0);
    console.log("Selected Total: ", selectedTotal);
    setTotalprice(selectedTotal);
    console.log("sản phẩm được chọn", selectedProducts);
  }, [selectedProducts, cartListProduct]);

  const updateQuantity = (productId, state) => {
    setCartListProduct((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === productId) {
          let newQuantity = item.quantity_order;
          if (state === "incqty") {
            newQuantity += 1;
          } else if (state === "decqty" && newQuantity > 0) {
            newQuantity -= 1;
          }
          setProductQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
          }));
          return { ...item, quantity_order: newQuantity };
        }
        return item;
      });
      toast.success("Cập nhật giỏ hàng thành công", { autoClose: 1000 });
      return updatedCart;
    });
  };

  const incQuantity = async (id) => {
    const res = await increaseQuantity(id);
    console.log(res ? "true" : "false");
    if (res) {
      updateQuantity(id, "incqty");
      console.log("Increasing quantity success " + id);
    } else {
      toast.error("Số lượng sản phẩm đã hết");
      console.log("Increasing quantity fail " + id);
    }
  };

  const decQuantity = async (id) => {
    const res = await decreaseQuantity(id);
    if (res) {
      updateQuantity(id, "decqty");
      console.log("Decreasing quantity success " + id);
    } else {
      console.log("Decreasing quantity fail " + id);
    }
  };

  // mảng chứa danh sách các sản phẩm theo shop
  const shopsWithProducts = [];
  cartListProduct.forEach((productItem) => {
    const existingShopIndex = shopsWithProducts.findIndex(
      (shop) => shop.shopId === productItem.shop_id
    );
    //  sử dụng findIndex trong JavaScript, nếu phần tử không được tìm thấy, nó sẽ trả về giá trị -1
    if (existingShopIndex !== -1) {
      // Shop đã tồn tại trong mảng
      shopsWithProducts[existingShopIndex].products.push(productItem);
    } else {
      // Tạo mới shop và thêm vào mảng
      shopsWithProducts.push({
        shopId: productItem.shop_id,
        shopName: productItem.shopName,
        products: [productItem],
      });
    }
  });

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
                  {shopsWithProducts.map((shop, index) => (
                    <>
                      <tr className="shopNameRow">
                        <td colSpan="7">Tên shop: {shop.shopName}</td>
                      </tr>
                      {shop.products.map((productItem, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              className="select__Checkbox"
                              checked={selectedProducts[productItem.id]}
                              onChange={() =>
                                handleCheckboxChange(productItem.id)
                              }
                            />
                          </td>
                          <td>
                            <img
                              src={`${auth.url}${productItem.image}`}
                              //src={`http://0.tcp.ap.ngrok.io:15234/${productItem.image}`}
                              alt={productItem.name}></img>
                          </td>
                          <td>
                            {productItem.name} - {shop.shopName}
                          </td>
                          <td>
                            {parseInt(productItem.price).toLocaleString(
                              "vn-VN"
                            )}{" "}
                            đ
                          </td>
                          <td>
                            <div className="qty">
                              <button
                                className="incqty"
                                onClick={() => incQuantity(productItem.id)}>
                                +
                              </button>
                              <input
                                type="text"
                                value={productItem.quantity_order}></input>
                              <button
                                className="incqty"
                                onClick={() => decQuantity(productItem.id)}>
                                -
                              </button>
                            </div>
                          </td>
                          <td>
                            <p className="subtotal">
                              {(
                                productItem.price * productItem.quantity_order
                              ).toLocaleString("vn-VN")}{" "}
                              đ
                            </p>
                          </td>
                          <td>
                            <div className="close">
                              <button
                                onClick={() => delfromcart(productItem.id)}>
                                <AiOutlineClose />
                              </button>
                            </div>
                          </td>
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
                                Thêm mã giảm giá của Shop
                                <DiscountListShop shop_id={shop.shopId} />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
                {/* <tbody>
                                </tbody> */}
              </table>
              {/* <div className="discount__byShop">
                                <span className="discount__byShop-icon"><CiDiscount1 /></span>
                                <div className="discount__byShop-ad">
                                    <div className="btn__checkout-discount-shop" >
                                        Thêm mã giảm giá của Shop
                                        <DiscountListShop shop_product_id={shop_product_id_list} />
                                    </div>
                                </div>
                            </div> */}
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
