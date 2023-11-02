import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './cart.css';
import '../../assets/css/base.css';



const Cart = ({ cart, setCart }) => {
    // increace qty: tăng số lượng trên cùng một mặt hàng
    const incqty = (product) => {
        const exsit = cart.find((x) => {
            return x.id === product.id
        })
        setCart(cart.map((curElm) => {
            return curElm.id === product.id ? { ...exsit, qty: exsit.qty + 1 } : curElm
        }).filter((curElm) => curElm.qty > 0));
    }

    // Dec Qty: giảm số lượng trên cùng một mặt hàng
    const decqty = (product) => {
        const exsit = cart.find((x) => {
            return x.id === product.id
        })
        setCart(cart.map((curElm) => {
            return curElm.id === product.id ? { ...exsit, qty: exsit.qty - 1 } : curElm
        }))
    }
    //Remove cart product
    const removeproduct = (product) => {
        const exsit = cart.find((x) => {
            return x.id === product.id
        })
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
    const Totalprice = cart.reduce((price, item) => price + item.qty * item.Price, 0)
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
                        <table class="cart-table">
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
                                cart.map((curElm) => {
                                    return (
                                        <tbody>
                                            <tr key={curElm.id}>
                                                <td><img src={curElm.Img} alt={curElm.Title}></img></td>
                                                <td>{curElm.Title}</td>
                                                <td>{curElm.Price} đ</td>
                                                <td>
                                                    <div className='qty'>
                                                        <button className='incqty' onClick={() => incqty(curElm)}>+</button>
                                                        <input type='text' value={curElm.qty}></input>
                                                        <button className='decqty' onClick={() => decqty(curElm)}>-</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className='subtotal'>{curElm.Price * curElm.qty} đ</p>
                                                </td>
                                                <td>
                                                    <div className='close'>
                                                        <button onClick={() => removeproduct(curElm)}><AiOutlineClose /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                            }

                        </table>
                        {
                            cart.length > 0 &&
                            <>
                                <div className='grid'>
                                    <div className='cart__totalprice'>
                                        <h2 className='totalprice'>total: {Totalprice} đ</h2>
                                        <button className='checkout'>Checkout</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart