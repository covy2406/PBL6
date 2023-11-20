import Slider from "react-slick";

//import Tdata from "./Topdata.js";
import './TopSliderStyle.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import Tdata from "./Topdata";
import { useAuth0 } from "@auth0/auth0-react";

// import { useEffect, useState } from "react";
// import apiProductHome from "api/apiProductHome.js";

function TopHomeSlider({ view, addtocart, productList, setProductList }) {

    const { isAuthenticated, loginWithRedirect } = useAuth0();
    //CALL API:
    // const [productSlider, setProductSlider] = useState([]);
    // const [error, setError] = useState([]);

    // useEffect(() => {
    //     fetchProductSlider()
    // }, [])

    // const fetchProductSlider = async () => {
    //     try {
    //         const responseSlider = await apiProductHome.getAll();
    //         setProductSlider(responseSlider);
    //     }
    //     catch(error) {
    //         setError(error);
    //     }
    // }
    // fetchProductSlider();

    // if(error) {
    //     return <p>Error: {error.message}</p>
    // }

    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <Slider {...settings}>
            {Tdata.map((value) => {
                return (
                    <div className='box__hot' key={value.id}>
                        <div className='box__img-hot'>
                            <img className="box__img-hot-image" src={value.image} alt={value.name} />
                            <div className="icon__hide">
                                {
                                    isAuthenticated ?
                                        <li onClick={() => addtocart(value)}><AiOutlineShoppingCart /></li>
                                        :
                                        <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart /></li>
                                }
                                <li className='icon__link' onClick={() => view(value)}><Link to='../Viewdetail'><BsEye /></Link></li>
                            </div>
                        </div>
                        <div className="box__detail-hot">
                            <div className="box__detail-hot-tcenter">
                                <span className='tcenter'>{value.name}</span>
                            </div>
                            <div className="box__detail-hot-price">
                                <span className="tcenter-price__old">{value.Price_old} đ</span>
                                <span className="tcenter-price__recent">{value.price} đ</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </Slider>
    );
}

export default TopHomeSlider;