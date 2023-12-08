import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import './cart.css';
import '../../assets/css/base.css';
import { useCart } from "context/AddToCartContext";
import { useEffect } from 'react';


const Cart = () => {
    const { cartListProduct, fetchCartList } = useCart();

    // increace qty: tăng số lượng trên cùng một mặt hàng
    const [cart, setCart] = useState([])
    const incqty = (product) => {
        const exsit = cart.find((item) => {
            return item.id === product.id
        })
        setCart(cart.map((item) => {
            return item.id === product.id ? { ...exsit, qty: exsit.qty + 1 } : item
        }).filter((item) => item.qty > 0));
    }

    // Descrease Qty: giảm số lượng trên cùng một mặt hàng
    const decqty = (product) => {
        // x === item
        const exsit = cart.find((x) => {
            return x.id === product.id
        })
        if(exsit.qty === 1) {
            setCart(cart.filter((x) => x.id !== product.id))
        }
        else {
            setCart(cart.map((item) => { return item.id === product.id ? { ...exsit, qty: exsit.qty - 1 } : item}))
        }
    }

    //Remove cart product: xóa sản phẩm khỏi giỏ hàng (CLOSE)
    const removeproduct = (product) => {
        const exsit = cart.find((x) => { return x.id === product.id })

        if (exsit.qty > 0) {
            setCart(cart.filter((x) => {
                return x.id !== product.id
            }))
        }
        else {
            const updatedCart = cart.filter((x) => x.id !== product.id);
            setCart(updatedCart);
        }
    }
    // Total price
    const Totalprice = cartListProduct.data.reduce((price, item) => { return price + item.quantity_product * item.price } , 0)

   

    useEffect(() => {
        fetchCartList(); 
      }, [fetchCartList])



    return (
        <>
            <div className='cartcontainer'>
                <div className='grid'>
                    {cartListProduct.data.length === 0 &&
                        <div className='emptycart'>
                            <h2 className='empty'>Cart is Empty</h2>
                            <Link to='/product' className='emptycartbtn'>Shop Now</Link>
                        </div>
                    }
                    <div className='contant'>
                        {
                            cartListProduct.data.length > 0 &&
                            <>
                                <div className='grid'>
                                    <div className='cart__totalprice'>
                                        <h2 className='totalprice'>total: {Totalprice} đ</h2>
                                        <button className='btn__checkout'>Thanh toán ngay</button>
                                    </div>
                                </div>
                            </>
                        }
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>sản phẩm</th>
                                    <th>Tên</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            {
                                cartListProduct.data.map((item) => {
                                    return (
                                        <tbody>
                                            <tr key={item.id}>
                                                <td><img src={`http://0.tcp.ap.ngrok.io:19356/${item.image}`} alt={item.name}></img></td>
                                                <td>{item.name}</td>
                                                <td>{item.price} đ</td>
                                                <td>
                                                    <div className='qty'>
                                                        <button className='incqty' onClick={() => incqty(item)}>+</button>
                                                        <input type='text' value={item.quantity_order}></input>
                                                        <button className='decqty' onClick={() => decqty(item)}>-</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className='subtotal'>{item.price * item.quantity_order} đ</p>
                                                </td>
                                                <td>
                                                    <div className='close'>
                                                        <button onClick={() => removeproduct(item)}><AiOutlineClose /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                            }

                        </table> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart