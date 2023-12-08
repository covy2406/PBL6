import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import './home.css';
import apiProductHome from 'api/apiProductHome';
import { useCart } from "context/AddToCartContext";
import AuthContext from "context/AuthProvider";
import { toast } from "react-toastify";

// import apiAddToCart from 'api/apiAddToCart';
// import { useParams } from 'react-router-dom';
//import { toast } from 'react-toastify';



const ProductHome = ({ view }) => {
    const { loginWithRedirect} = useAuth0();
    // const isAuth = true;
    const { auth } = useContext(AuthContext);
    const { addtocart } = useCart();

    // const formattedPrice = new Intl.NumberFormat('vi-VN', {
    //     style: 'currency',
    //     currency: 'VND',
    // }).format(price);

    const [productList, setProductList] = useState([]);
    const [error, setError] = useState(null);

    // const [cartHome, setCartHome] = useState([]);
    // const {id} = useParams();

    useEffect(() => {
        const fetchProductHome = async () => {
            try {
                const response = await apiProductHome.getAll();
                setProductList(response.data)
    
            } catch (error) {
                setError(error);
                toast.error(error?.message);
            }
        }
        fetchProductHome();
    }, []);
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className='container'>
            {/* <p >{productList}</p> */}
            {
                productList && productList.length > 0 ?
                // Array.isArray(productList) ? or productList && productList.lenght > 0 ? đều kiểm tra xem có phải dữ liệu từ api là mảng hay ko.
                    productList.map((curElm) => {
                        return (
                            <div className='box' key={curElm.shop_product_id}>
                                <div className='img_box'>
                                    {/* {`http://localhost:8000${curElm.image}`} */}
                                    <img className='product-main__item' src={`http://0.tcp.ap.ngrok.io:19356/${curElm.image}`} alt={curElm.name}></img>
                                    <div className='icon'>
                                        {
                                            auth.isAuth ?
                                            (
                                                <li onClick={() => addtocart(curElm.shop_product_id, 1)}><AiOutlineShoppingCart /></li>
                                                
                                            )
                                            :
                                            (
                                                <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart/></li>
                                            )
                                        }
                                        <li className='icon__link' onClick={() => view(curElm.shop_product_id)}><Link to={`../Viewdetail/${curElm.shop_product_id}`}><BsEye /></Link></li>
                                    </div>
                                </div>
                                <div className='detail'>
                                    <h4 className="home-product-item__name">
                                        {curElm.name}
                                    </h4>
                                    <div className="home-product-item__description">
                                        {curElm.detail}
                                    </div>
                                    <div className="home-product-item__price">
                                        <span className="home-product-item__price-old"></span>
                                        <span className="home-product-item__price-current">{curElm.price} đ</span>
                                    </div>

                                    <div className="home-product-item__origin">
                                        <span className="home-product-item__brand">{curElm.shopName}</span>
                                        <span className="home-product-item__origin-name"></span>
                                    </div>
                                    {/* {
                                        shop &&
                                        <div className="home-product-item__origin">
                                            <span className="home-product-item__brand">{shop.shopName}</span>
                                            <span className="home-product-item__origin-name">{shop.shopAddress}</span>
                                        </div>
                                    } */}
                                </div>
                            </div>
                        )
                    })
                    :
                    <>
                        <p>Không có sản phẩm nào</p>
                        <p >{productList}</p>
                    </>
            }
        </div>
    )
}
export default ProductHome;
