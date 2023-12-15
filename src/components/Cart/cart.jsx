import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import "./cart.css";
import "../../assets/css/base.css";

import { useCart } from "context/AddToCartContext";
import apiIncreaseProduct from 'api/apiIncreaseProduct'
import apiDecreaseProduct from "api/apiDecreaseProduct";
// import apiRemoveProduct from 'api/apiRemoveProduct';

const Cart = () => {
    const { cartListProduct, updateQuantity } = useCart();
    // const [inCrease, setIncrease] = useState([]);
    // const [decrease, setDecrease] = useState([]);
    const [error, setError] = useState(null);
    // const {id,} = useParams();

    const increaseQuantity  = async (id) => {
        console.log(id);
        try {
            const response = await apiIncreaseProduct.incqty(id);
            updateQuantity(id, response.data.quantity_order);
            //setIncrease(response.data);
        }
        catch (error) {
            setError(error);
        }
    }

    const decreaseQuantity = async(id) => {
        console.log('Decreasing quantity: ' + id);
        try {
            const response = await apiDecreaseProduct.decqty(id);
            updateQuantity(id, response.data.quantity_order);
            //setDecrease(response.data);
        }
        catch(error) {
            setError(error);
        }
    }

    if(error) {
        return <p>Error: {error.message}</p>
    }
    
    // Total price
    const Totalprice = cartListProduct.data ? cartListProduct.data.reduce((price, item) => {
        return price + item.quantity_product * item.price;
    }, 0) : 0;

    return (
        <>
            <div className='cartcontainer'>
                <div className='grid'>
                    {   cartListProduct.data.length === 0 &&
                        (
                            <div className='emptycart'>
                                <h2 className='empty'>Cart is Empty</h2>
                                <Link to='/product' className='emptycartbtn'>Shop Now</Link>
                            </div>
                        )
                    }
                    <div className='contant'>
                        {
                            cartListProduct.data.length > 0 &&
                            (
                                <div>
                                    <div className='grid'>
                                        <div className='cart__totalprice'>
                                            <h2 className='totalprice'>total: {Totalprice.toLocaleString("vn-VN")} đ</h2>
                                            <button className='btn__checkout'>Mua hàng</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            {
                                <tbody>
                                    {cartListProduct.data.map((item) => (
                                        <tr key={item.id}>
                                            <td><img src={`http://0.tcp.ap.ngrok.io:19947/${item.image}`} alt={item.name}></img></td>
                                            <td>{item.name}</td>
                                            <td>{parseInt(item.price).toLocaleString("vn-VN")} đ</td>
                                            <td>
                                                <div className='qty'>
                                                    <button className='incqty' onClick={() => increaseQuantity(item.id)}>+</button>
                                                    <input type='text' defaultValue={item.quantity_order}></input>
                                                    <button className='incqty' onClick={() => decreaseQuantity(item.id)}>-</button>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='subtotal'>{(item.price * item.quantity_order).toLocaleString("vn-VN")} đ</p>
                                            </td>
                                            <td>
                                                <div className='close'>
                                                    {/* <button onClick={() => removeproduct(item.product_order_id)}><AiOutlineClose /></button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            }

                        </table> 
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
