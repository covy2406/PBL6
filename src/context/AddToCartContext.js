import React, { createContext, useContext, useState, useEffect } from "react";
import apiAddToCart from "api/apiAddToCart";
import apiViewCart from "api/apiViewCart";
import { toast } from "react-toastify";

const CartContext = createContext();

// Tạo một custom hook để sử dụng context
export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartListProduct, setCartListProduct] = useState({ data: [] });
    const [, setDetail] = useState(false);
    const [close, setClose] = useState(false);
    //const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);


    const addtocart = async (productId, quantity) => {
        try {
            // Gọi hàm addtocart từ api hoặc chỗ nào bạn đã định nghĩa
            const response = await apiAddToCart.add(productId, quantity);
            setCart(response.data);

            if (response.status === 200) {
                // Lấy thông tin chi tiết sản phẩm từ dữ liệu phản hồi
                const productDetail = response.data;
                console.log(productDetail);

                // Kiểm tra xem đã hiển thị thông báo chưa trước đó
                const hasShownNotification = window.localStorage.getItem("hasShownAddToCartNotification");
                if (!hasShownNotification) {
                    toast.success('Thêm sản phẩm vào giỏ hàng thành công');
                    window.localStorage.setItem("hasShownAddToCartNotification", "true");
                }
                return true;
            }

            else {
                toast.error('thất bại')
            }
        } catch (error) {
            return false;
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        setCartListProduct((prevCart) => {
            const updatedCart = prevCart.data.map((item) => {
                if (item.id === productId) {
                    return { ...item, quantity_order: newQuantity };
                }
                return item;
            });
            return { ...prevCart, data: updatedCart };
        });
    };

    // get sản phẩm đã thêm vào giỏ hàng về
    const showCartList = async () => {

        try {
            // Kiểm tra xem cartListProduct đã lưu trong localStorage chưa
            const storedCartList = window.localStorage.getItem("cartListProduct");
    
            if (storedCartList) {
                // Nếu đã lưu, cập nhật state từ localStorage
                const cartlist = JSON.parse(storedCartList);
                setCartListProduct(cartlist);
            } else {
                // Nếu chưa lưu, gọi API để lấy danh sách sản phẩm từ giỏ hàng
                const response = await apiViewCart.getViewCart();
    
                if (response.status === 200) {
                    // Cập nhật state và lưu vào localStorage nếu API trả về thành công
                    setCartListProduct(response.data);
                    window.localStorage.setItem("cartListProduct", JSON.stringify(response.data));
                } else {
                    // Xử lý khi API trả về lỗi
                    console.error("API error:", response.statusText);
                    toast.error("Không thể tải danh sách sản phẩm từ giỏ hàng");
                }
            }

        } catch (error) {
            console.error("Lỗi khi hiển thị danh sách sản phẩm trong giỏ hàng:", error);
            toast.error("Có lỗi xảy ra khi hiển thị danh sách sản phẩm trong giỏ hàng");
        }
    };
   

    // Xem chi tiet san pham
    const view = (productId) => {
        // Cập nhật trạng thái detail với đối tượng sản phẩm để hiển thị chi tiết sản phẩm bằng cách truyền id của sản phẩm đó vào
        setDetail(productId);
        // Đặt trạng thái close thành true để đóng hộp thoại chi tiết sản phẩm
        setClose(true);
    };

    // useEffect(() => {
    //     addtocart();
        
    // }, []);

    useEffect(() => {
        addtocart();
        showCartList();
    }, [])

    useEffect(() => {
        console.log('Danh sach san pham da them vao gio hang:', cartListProduct);
    }, [cartListProduct]);

    const contextCartData = {
        cart,
        addtocart,
        cartListProduct,
        showCartList,
        view,
        close,
        setClose,
        setCartListProduct,
        updateQuantity
    };

    return (
        <CartContext.Provider value={contextCartData}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
