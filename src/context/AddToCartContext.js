import React, { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartListProduct, setCartListProduct] = useState([]);
  // const [, setDetail] = useState(false);
  const [close, setClose] = useState(false);
  //const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);

  // Xem chi tiet san pham
  const view = (productId) => {
    // Cập nhật trạng thái detail với đối tượng sản phẩm để hiển thị chi tiết sản phẩm bằng cách truyền id của sản phẩm đó vào
    // setDetail(productId);
    // Đặt trạng thái close thành true để đóng hộp thoại chi tiết sản phẩm
    setClose(true);
  };

  const contextCartData = {
    cart,
    setCart,
    cartListProduct,
    view,
    close,
    setClose,
    setCartListProduct,
  };

  return (
    <CartContext.Provider value={contextCartData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
