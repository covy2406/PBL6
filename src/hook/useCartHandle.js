import useCart from "./useCart";
import apiHandleCart from "api/apiHandleCart";

const useCartHandle = () => {
  const { setCartListProduct } = useCart();
  // Add to cart
  const addtocart = async (productId, quantity) => {
    const response = await apiHandleCart.add(productId, quantity);
    if (response) {
      showCartList();
      return true;
    } else {
      console.error("Add to cart err", response);
      return false;
    }
  };

  // Show all product in cart
  const showCartList = async () => {
    const response = await apiHandleCart.view();
    if (response) {
      if (response.data?.message) {
        console.log("Show cart list err", response);
        return false;
      }
      // Cập nhật state và lưu vào sessionStorage nếu API trả về thành công
      window.sessionStorage.setItem(
        "cartListProduct",
        JSON.stringify(response.data)
      );
      setCartListProduct(
        JSON.parse(window.sessionStorage.getItem("cartListProduct"))
      );
      return true;
    } else {
      console.error("Show cart list err", response);
      return false;
    }
  };
  const increaseQuantity = async (id) => {
    try {
      const res = await apiHandleCart.incqty(id);
      console.log(res);
      if (res.data.data?.id) {
        return true;
      } else {
        console.log("increase quantity error: " + res.data.message);
        return false;
      }
    } catch (error) {
      console.log("increase quantity error: " + error);
      return false;
    }
  };
  const decreaseQuantity = async (id) => {
    console.log("Decreasing quantity: " + id);
    try {
      const res = await apiHandleCart.decqty(id);
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("decrease quantity error: " + error);
      return false;
    }
  };

  return { addtocart, showCartList, increaseQuantity, decreaseQuantity };
};

export default useCartHandle;
