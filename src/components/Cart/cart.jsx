import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import './cart.css';
import '../../assets/css/base.css';



const Cart = () => {
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
    const Totalprice = cart.reduce((price, item) => { return price + item.qty * item.price } , 0)
    return (
        <>
            <div className='cartcontainer'>
                <div className='grid'>
                    {cart.length === 0 &&
                        <div className='emptycart'>
                            <h2 className='empty'>Cart is Empty</h2>
                            <Link to='/product' className='emptycartbtn'>Shop Now</Link>
                        </div>
                    }
                    <div className='contant'>
                        {
                            cart.length > 0 &&
                            <>
                                <div className='grid'>
                                    <div className='cart__totalprice'>
                                        <h2 className='totalprice'>total: {Totalprice} đ</h2>
                                        <button className='btn__checkout'>Checkout</button>
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
                                cart.map((item) => {
                                    return (
                                        <tbody>
                                            <tr key={item.id}>
                                                <td><img src={`http://0.tcp.ap.ngrok.io:19912/${item.image}`} alt={item.name}></img></td>
                                                <td>{item.name}</td>
                                                <td>{item.price} đ</td>
                                                <td>
                                                    <div className='qty'>
                                                        <button className='incqty' onClick={() => incqty(item)}>+</button>
                                                        <input type='text' value={item.qty}></input>
                                                        <button className='decqty' onClick={() => decqty(item)}>-</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className='subtotal'>{item.price * item.qty} đ</p>
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