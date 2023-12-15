import { useContext } from "react";
import CartContext from "../context/AddToCartContext";

// Tạo một custom hook để sử dụng context
const useCart = () => {
  const cart = useContext(CartContext);
  return cart;
};

export default useCart;
