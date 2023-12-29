import { toast } from "react-toastify";
import useCart from "./useCart";
import apiHandleCart from "api/apiHandleCart";
import apiHandlePayment from "api/apiHandlePayment";
import { useEffect } from "react";

const useCartHandle = () => {
    const { cartListProduct, selectedProducts, setCartListProduct } = useCart();
    // Add to cart
    const addtocart = async (productId, quantity) => {
        const response = await apiHandleCart.add(productId, quantity);
        if (response) {
            showCartList();
            toast.success('Thêm vào giỏ hàng thành công', {autoClose: 1000})
            return true;
        } else {
            console.error("Add to cart err", response);
            toast.error('Không thể thêm vào giỏ hàng', response);
            return false;
        }
    };

    // xoa 1 san pham trong gio hang
    const delfromcart = async (productID) => {
        const response = await apiHandleCart.del(productID);
        console.log('shop_product_id', productID);
        if (response) {
            showCartList();
            toast.success('Đã xóa sản phẩm ra khỏi giỏ hàng')
            return true;
        } else {
            console.error("Delete from cart error", response);
            toast.error('Lỗi không thể xóa sản phẩm');
        }
    };

    // Show all product in cart
    const showCartList = async () => {
        const response = await apiHandleCart.viewCart();
        if (response) {
            if (response.data?.message) {
                console.log("Show cart list err", response);
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

    

    return {
        addtocart,
        delfromcart,
        showCartList,
        increaseQuantity,
        decreaseQuantity,
        //handlePayment
    };
};

export default useCartHandle;
