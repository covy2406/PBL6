import { toast } from "react-toastify";
import useCart from "./useCart";
import apiHandleCart from "api/apiHandleCart";

const useCartHandle = () => {
  const { setCartListProduct } = useCart();
  // Add to cart
  const addtocart = async (productId, quantity) => {
    const response = await apiHandleCart.add(productId, quantity);
    if (response) {
      showCartList();
      toast.success("Thêm vào giỏ hàng thành công");
      return true;
    } else {
      toast.error("Không thể thêm vào giỏ hàng", response);
      return false;
    }
  };

  // xoa 1 san pham trong gio hang
  const delfromcart = async (productID) => {
    const response = await apiHandleCart.del(productID);
    if (response) {
      showCartList();
      toast.success("Đã xóa sản phẩm ra khỏi giỏ hàng");
      return true;
    } else {
      toast.error("Lỗi không thể xóa sản phẩm");
    }
  };

  // Show all product in cart
  const showCartList = async () => {
    const response = await apiHandleCart.viewCart();
    if (response) {
      if (response.data?.message) {
        return false;
      }
      // Cập nhật state và lưu vào sessionStorage nếu API trả về thành công
      window.sessionStorage.setItem(
        "cartListProduct",
        JSON.stringify(response.data.data)
      );
      setCartListProduct(
        JSON.parse(window.sessionStorage.getItem("cartListProduct"))
      );
      return true;
    } else {
      toast.error("Lỗi không thể xem giỏ hàng");
      return false;
    }
  };
  const increaseQuantity = async (id) => {
    try {
      const res = await apiHandleCart.incqty(id);
      if (res.data.data?.id) {
        return true;
      } else {
        toast.error("Lỗi không thể tăng số lượng");
        return false;
      }
    } catch (error) {
      toast.error("Lỗi không thể tăng số lượng");
      return false;
    }
  };
  const decreaseQuantity = async (id) => {
    try {
      const res = await apiHandleCart.decqty(id);
      if (res) {
        return true;
      } else {
        toast.error("Lỗi không thể giảm số lượng");
        return false;
      }
    } catch (error) {
      toast.error("Lỗi không thể giảm số lượng");
      return false;
    }
  };

  //     const handleCheckout = async() => {
  //         // Lấy ra các sản phẩm đã được chọn
  //   const selectedItems = cartListProduct.filter(
  //     (item) => selectedProducts[item.id]
  //   );
  //     }

  return {
    addtocart,
    delfromcart,
    showCartList,
    increaseQuantity,
    decreaseQuantity,
  };
};

export default useCartHandle;
