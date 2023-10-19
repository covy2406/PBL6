import React from 'react';
import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { AiOutlineDown } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { useAuth0 } from "@auth0/auth0-react";
import Productdetail from './productdetail';
import BannerProducts from './BannerProducts';
import Pagination from './pageNumberProducts.js';
import './assets/css/product.css';
import './assets/css/nav.css';
import './assets/css/base.css';
import './assets/css/home.css';



const Product = ({ product, setProduct, detail, view, close, setClose, addtocart }) => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const filtterproduct = (product) => {
        const update = Productdetail.filter((x) => {
            return x.Cat === product;
        })
        setProduct(update);
    }
    const AllProducts = () => {
        setProduct(Productdetail)
    }

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; // Tổng số trang

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Thực hiện truy vấn API hoặc cập nhật danh sách sản phẩm theo trang pageNumber
    };
    return (
        <>
            {
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
            }

            <div className='products'>
                <div className='grid'>
                    {/* <h2># Products</h2>
                     <p>Home . products</p> */}
                    
                    <BannerProducts></BannerProducts>

                    <div className='products-list'>
                        <div className='grid__column-2'>
                            <nav className='categories'>
                                <h3 className='categories__heading'>categories</h3>
                                <ul className='categories-list'>
                                    <table>
                                        <tr>
                                            <td>
                                                <input type='checkbox' id='tất cả'></input>
                                                <label for='tất cả'>Tất cả</label>
                                            </td>
                                            <td>Contact</td>
                                        </tr>
                                        <tr>
                                            <td>Alfreds Futterkiste</td>
                                            <td>Maria Anders</td>

                                        </tr>
                                        <tr>
                                            <td>Centro comercial Moctezuma</td>
                                            <td>Francisco Chang</td>

                                        </tr>
                                        <tr>
                                            <td>Ernst Handel</td>
                                            <td>Roland Mendel</td>

                                        </tr>
                                        <tr>
                                            <td>Island Trading</td>
                                            <td>Helen Bennett</td>

                                        </tr>
                                        <tr>
                                            <td>Laughing Bacchus Winecellars</td>
                                            <td>Yoshi Tannamuri</td>

                                        </tr>
                                        <tr>
                                            <td>Magazzini Alimentari Riuniti</td>
                                            <td>Giovanni Rovelli</td>

                                        </tr>
                                    </table>
                                    <li className='categories-item' onClick={() => AllProducts()}>All Products</li>
                                    <li className='categories-item' onClick={() => filtterproduct("SamSung")}>SamSung</li>
                                    <li className='categories-item' onClick={() => filtterproduct("Apple")}>Apple</li>
                                    <li className='categories-item' onClick={() => filtterproduct("Xiaomi")}>Xiaomi</li>
                                    <li className='categories-item' onClick={() => filtterproduct("Huawei")}>Huawei</li>
                                    <li className='categories-item' onClick={() => filtterproduct("Realmi")}>Realmi</li>
                                    <li className='categories-item' onClick={() => filtterproduct("Nokia")}>Nokia</li>
                                    <li className='categories-item' onClick={() => filtterproduct("Vivo")}>Vivo</li>
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
                                    product.map((curElm) => {
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
                                                            <li onClick={() => view(curElm)}><BsEye /></li>
                                                            <li><AiOutlineHeart /></li>
                                                        </div>
                                                    </div>
                                                    <div className='detail'>
                                                        <h4 class="home-product-item__name">
                                                            {curElm.Title}
                                                        </h4>
                                                        <div class="home-product-item__price">
                                                            <span class="home-product-item__price-old">{curElm.Price_old} đ</span>
                                                            <span class="home-product-item__price-current">{curElm.Price} đ</span>
                                                        </div>
                                                        <div class="home-product-item__action">
                                                            {/* <!-- class khi đưa vào thì tym đỏ, ko có thì ko màu: home-product-item__like--liked --> */}
                                                            {/* <span class="home-product-item__like ">
                                                                <i class="home-product-item__like-icon-empty far fa-heart"></i>
                                                                <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                                                            </span> */}
                                                            <div class="home-product-item__rating">
                                                                <i class="home-product-item__star--gold fas fa-star"><AiOutlineStar /></i>
                                                                <i class="home-product-item__star--gold fas fa-star"><AiOutlineStar /></i>
                                                                <i class="home-product-item__star--gold fas fa-star"><AiOutlineStar /></i>
                                                                <i class="home-product-item__star--gold fas fa-star"><AiOutlineStar /></i>
                                                                <i class="home-product-item__star--gold fas fa-star"><AiOutlineStar /></i>
                                                            </div>
                                                            <span class="home-product-item__sold">88 đã bán</span>
                                                        </div>
                                                        <div class="home-product-item__origin">
                                                            <span class="home-product-item__brand">{curElm.Brand}</span>
                                                            <span class="home-product-item__origin-name">{curElm.origin}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            {/* PHÂN TRANG: PAGINATION */}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            >
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product