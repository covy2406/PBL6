import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { AiOutlineDown } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { AiOutlineHeart} from 'react-icons/ai';
import { useAuth0 } from "@auth0/auth0-react";
import OldphoneData  from './oldPhoneData';
import '../NewProduct/product.css';
import '../Header/nav.css';
import '../../assets/css/base.css';
import '../Home/home.css';
import './secondHand.css';
import BannerProducts from 'components/BannerProduct/BannerProducts';


const Oldphone = ({ oldData, setOldproduct, detail, view, close, setClose, addtocart }) => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const filtterproduct = (oldData) => {
        const update = OldphoneData.filter((x) => {
            return x.Cat === oldData;
        })
        setOldproduct(update);
    }
    const AllProducts = () => {
        setOldproduct(OldphoneData)
    }
    return (
        <>
            {/* {
                close ?
                    <div className='product_detail'>
                        <div className='container'>
                            <button onClick={() => setClose(false)} className='closebtn'><AiOutlineCloseCircle /></button>
                            {
                                detail.map((curElm) => {
                                    return (
                                        <div className='productbox'>
                                            <div className='img-box'>
                                                <img src={curElm.Img} alt={curElm.Title}></img>
                                            </div>
                                            <div className='detail'>
                                                <h4>{curElm.Cat}</h4>
                                                <h2>{curElm.Title}</h2>
                                                <p>A Screen Everyone Will Love: Whether your family is streaming or video chatting with friends tablet A8... </p>
                                                <h3>{curElm.Price}</h3>
                                                <button>Add To Cart</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className='productbox'></div>
                        </div>
                    </div> : null
            } */}

            <div className='products'>
                <div className='grid'>
                    {/* <h2># Products</h2>
                     <p>Home . products</p> */}
                    {/* <div className='products-banner'></div> */}
                    {/* <BannerSlider></BannerSlider> */}

                    <BannerProducts></BannerProducts>

                    <div className='products-list'>
                        <div className='grid__column-2'>
                            <nav className='categories'>
                                <h3 className='categories__heading'>categories</h3>
                                <ul className='categories-list'>
                                <li className='categories-item' onClick={() => AllProducts()}>
                                        <input className='categories-item__input' type='checkbox' id='all' name='all'></input>
                                        <label className='categories-item__label' htmlFor='all'>Tất cả</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("SamSung")}>
                                        <input className='categories-item__input' type='checkbox' id='SamSung' name='SamSung' ></input>
                                        <label className='categories-item__label' htmlFor='SamSung'>SamSung</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("Apple")}>
                                        <input className='categories-item__input' type='checkbox' id='Apple'></input>
                                        <label className='categories-item__label' htmlFor='Apple'>Apple</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("Xiaomi")}>
                                        <input className='categories-item__input' type='checkbox' id='Xiaomi'></input>
                                        <label className='categories-item__label' htmlFor='Xiaomi'>Xiaomi</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("Huawei")}>
                                        <input className='categories-item__input' type='checkbox' id='Huawei'></input>
                                        <label className='categories-item__label' htmlFor='Huawei'>Huawei</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("Realmi")}>
                                        <input className='categories-item__input' type='checkbox' id='Realmi'></input>
                                        <label className='categories-item__label' htmlFor='Realmi'>Realmi</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("Nokia")}>
                                        <input className='categories-item__input' type='checkbox' id='Nokia'></input>
                                        <label className='categories-item__label' htmlFor='Nokia'>Nokia</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("Vivo")}>
                                        <input className='categories-item__input' type='checkbox' id='Vivo'></input>
                                        <label className='categories-item__label' htmlFor='Vivo'>Vivo</label>
                                    </li>
                                </ul>
                            </nav>

                            {/* CATEGORIES GIÁ */}
                            <nav className='categories'>
                            <h3 className='categories__heading'>Mức giá</h3>
                                <ul className='categories-list'>
                                    <li className='categories-item' onClick={() => AllProducts()}>
                                        <input className='categories-item__input' type='checkbox' id='all' name='all'></input>
                                        <label className='categories-item__label' for='all'>Tất cả</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("SamSung")}>
                                        <input className='categories-item__input' type='checkbox' id='SamSung' name='SamSung' ></input>
                                        <label className='categories-item__label' for='SamSung'>Dưới 2 triệu</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("Apple")}>
                                        <input className='categories-item__input' type='checkbox' id='Apple'></input>
                                        <label className='categories-item__label' for='Apple'>2 - 4 triệu</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("Xiaomi")}>
                                        <input className='categories-item__input' type='checkbox' id='Xiaomi'></input>
                                        <label className='categories-item__label' for='Xiaomi'>4 - 7 triệu</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("Huawei")}>
                                        <input className='categories-item__input' type='checkbox' id='Huawei'></input>
                                        <label className='categories-item__label' for='Huawei'>7 - 13 triệu</label>
                                    </li>
                                    <li className='categories-item' onClick={() => filtterproduct("Realmi")}>
                                        <input className='categories-item__input' type='checkbox' id='Realmi'></input>
                                        <label className='categories-item__label' for='Realmi'>Trên 13 triệu</label>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className='grid__column-10'>
                            <div className="home-filter">
                                <span className="home-filter__label">Sắp xếp theo</span>
                                <button className="btn home-filter__btn ">Phổ biến</button>
                                <button className="btn home-filter__btn btn--primary ">Mới nhất</button>
                                <button className="btn home-filter__btn">Bán chạy</button>

                                <div className="select-input">
                                    <span className="select-input__label">Giá</span>
                                    <i className="select-input__icon "><AiOutlineDown /></i>
                                    <ul className="select-input__list">
                                        <li className="select-input__item">
                                            <a href="/" className="select-input__link">Giá: Cao đến thấp</a>
                                        </li>
                                        <li className="select-input__item">
                                            <a href="/" className="select-input__link">Giá: Thấp đến cao</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="home-filter__page">
                                    <span className="home-filter__page-num">
                                        <span className="home-filter__page-current">1</span>/14
                                    </span>
                                    <div className="home-filter__page-control">
                                        <a href="/" className="home-filter__page-btn home-filter__page-btn--disabled">
                                            <i className="home-filter__page-icon "><AiOutlineLeft /></i>
                                        </a>
                                        <a href="/" className="home-filter__page-btn">
                                            <i className="home-filter__page-icon"><AiOutlineRight /></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='contant'>
                                {
                                    OldphoneData.map((curElm) => {
                                        return (
                                            <>
                                                <div className='box' key={curElm.id}>
                                                    <div className='img_box'>
                                                        <img src={curElm.Img} alt={curElm.Title}></img>
                                                        <div className='icon'>
                                                            {
                                                                isAuthenticated ?
                                                                    <li onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></li>
                                                                    :
                                                                    <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart /></li>
                                                            }
                                                            <li className='icon__link' onClick={() => view(curElm)}><Link to='../Viewdetail'><BsEye /></Link></li>
                                                            <li><AiOutlineHeart /></li>
                                                        </div>
                                                    </div>
                                                    <div className='detail'>
                                                        <h4 className="home-product-item__name">
                                                            {curElm.Title}
                                                        </h4>
                                                        <div className="home-product-item__price">
                                                            <span className="home-product-item__price-old">{curElm.Price_old} đ</span>
                                                            <span className="home-product-item__price-current">{curElm.Price} đ</span>
                                                        </div>
                                                        <div className="home-product-item__action">
                                                            {/* <!-- class khi đưa vào thì tym đỏ, ko có thì ko màu: home-product-item__like--liked --> */}
                                                            {/* <span className="home-product-item__like ">
                                                                <i className="home-product-item__like-icon-empty far fa-heart"></i>
                                                                <i className="home-product-item__like-icon-fill fas fa-heart"></i>
                                                            </span> */}
                                                            <div className="home-product-item__rating">
                                                                <i className="home-product-item__star--gold fas fa-star"><AiOutlineStar/></i>
                                                                <i className="home-product-item__star--gold fas fa-star"><AiOutlineStar/></i>
                                                                <i className="home-product-item__star--gold fas fa-star"><AiOutlineStar/></i>
                                                                <i className="home-product-item__star--gold fas fa-star"><AiOutlineStar/></i>
                                                                <i className="home-product-item__star--gold fas fa-star"><AiOutlineStar/></i>
                                                            </div>
                                                            {/* <span className="home-product-item__sold">88 đã bán</span> */}
                                                        </div>
                                                        <div className="home-product-item__origin">
                                                            <span className="home-product-item__brand">{curElm.Brand}</span>
                                                            <span className="home-product-item__origin-name">{curElm.origin}</span>
                                                        </div>
                                                        <div className='home-product-item__price-plus'>
                                                            <div className='home-product-item__price-new'>Giá máy mới: <strong>{curElm.Price_new} đ</strong></div>
                                                            <div className='home-product-item__price-save'>Tiết kiệm: <strong>{curElm.Price_save} đ</strong></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Oldphone;