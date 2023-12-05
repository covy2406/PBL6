import React, { createContext, useContext, useState } from 'react';
import apiAddToCart from 'api/apiAddToCart';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
}

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addtocart = async (productId, quantity, data) => {
        try {
            console.log(productId);
            // Gọi hàm addtocart từ api hoặc chỗ nào bạn đã định nghĩa
            const response = await apiAddToCart.add(productId, quantity);
      
            console.log("response add to cart", response);
            setCart(response.data);
      
            if (response.status === 200) {
              // Lấy thông tin chi tiết sản phẩm từ dữ liệu phản hồi
              const productDetail = response.data;
              console.log(productDetail);
              alert('Thêm sản phẩm vào giỏ hàng thành công');
              // sau đó, thêm sản phẩm vào giỏ hàng với thông tin chi tiết
              handleAddToCart(productDetail);
            } else {
              throw new Error('Thêm sản phẩm vào giỏ hàng thất bại');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddToCart = (product) => {
        // product được truyền vào hàm addtocart là sản phẩm được call từ api
        const exist = cart.find((item) => item.id === product.id);
    
        if (exist) {
          // nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng sản phẩm lên 1 và cập nhật lại giỏ hàng
          setCart(
            cart.map((item) => {
              return item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item;
            })
          );
          alert('Sản phẩm này đã được thêm vào giỏ hàng');
        } else {
          // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
          setCart([...cart, { ...product, qty: 1 }]);
        }
      };

    const contextCartData = {
        cart, addtocart, handleAddToCart
    }
    

    return (
        <CartContext.Provider value={contextCartData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;

