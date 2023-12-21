import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cart.css";
import "../../assets/css/base.css";
import useCart from "hook/useCart";
import useCartHandle from "hook/useCartHandle";
import useAuth from "hook/useAuth";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

const Cart = () => {
  const { auth } = useAuth();
  const { cartListProduct, setCartListProduct } = useCart();
  const { decreaseQuantity, increaseQuantity, delfromcart } = useCartHandle();

  const [Totalprice, setTotalprice] = useState(0);
  // Total price
  useEffect(() => {
    console.log(Totalprice);
    const total = cartListProduct.reduce((price, item) => {
      return price + parseInt(item.price) * item.quantity_order;
    }, 0);
    setTotalprice(total);
  }, [cartListProduct]); // <-- cartListProduct is the dependency

  const updateQuantity = (productId, state) => {
    setCartListProduct((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === productId) {
          if (item.quantity_order === 0) {
            return item;
          }
          if (state === "incqty") {
            const newQuantity = item.quantity_order + 1;
            return { ...item, quantity_order: newQuantity };
          }
          if (state === "decqty") {
            const newQuantity = item.quantity_order - 1;
            return { ...item, quantity_order: newQuantity };
          }
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
              <div>
                <div className="grid">
                  <div className="cart__totalprice">
                    <h2 className="totalprice">
                      total: {Totalprice.toLocaleString("vn-VN")} đ
                    </h2>
                    <button className="btn__checkout">Mua hàng</button>
                  </div>
                </div>
              </div>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {cartListProduct.map(
                    (item) =>
                      item.quantity_order > 0 && (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={`${auth.url}/${item.image}`}
                              alt={item.name}></img>
                          </td>
                          <td>{item.name}</td>
                          <td>
                            {parseInt(item.price).toLocaleString("vn-VN")} đ
                          </td>
                          <td>
                            <div className="qty">
                              <button
                                className="incqty"
                                onClick={() => incQuantity(item.id)}>
                                +
                              </button>
                              <input
                                type="text"
                                value={item.quantity_order}></input>
                              <button
                                className="incqty"
                                onClick={() => decQuantity(item.id)}>
                                -
                              </button>
                            </div>
                          </td>
                          <td>
                            <p className="subtotal">
                              {(
                                item.price * item.quantity_order
                              ).toLocaleString("vn-VN")}{" "}
                              đ
                            </p>
                          </td>
                          <td>
                            <div className="close">
                              <button
                                onClick={() =>
                                  delfromcart(item.product_order_id)
                                }>
                                <AiOutlineClose />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
