import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartListProduct, setCartListProduct] = useState(() => {
    // Try to get the cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      // If the cart exists in localStorage, return it
      return JSON.parse(savedCart);
    } else {
      // If the cart does not exist in localStorage, return an empty array
      return [];
    }
  });
  const [, setDetail] = useState(false);
  const [close, setClose] = useState(false);
  const [comment, setComment] = useState([]);
  // sản phẩm trang home
  const [productList, setProductList] = useState([]);
  // SEARCH
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);

  // Whenever cartListProduct changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("cartListProduct", JSON.stringify(cartListProduct));
  }, [cartListProduct]);
  // Xem chi tiet san pham
  const view = (productId) => {
    // Cập nhật trạng thái detail với đối tượng sản phẩm để hiển thị chi tiết sản phẩm bằng cách truyền id của sản phẩm đó vào
    setDetail(productId);
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
    comment,
    setComment,
    productList,
    setProductList,
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
  };

  return (
    <CartContext.Provider value={contextCartData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
