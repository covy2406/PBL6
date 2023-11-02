import { React } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { AiOutlineDown } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { useAuth0 } from "@auth0/auth0-react";
import Productdetail from './productdetail.js';
import BannerProducts from '../BannerProduct/BannerProducts.js';
import Pagination from '../../pageNumberProducts.js';
import './product.css';
import '../Header/nav.css';
import '../../assets/css/base.css';
import '../Home/home.css';

const Product = ({ product, setProduct, view, addtocart, detail, close, setClose }) => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    // Lọc sản phẩm:
    const filtterproduct = (product) => {
        const update = Productdetail.filter((x) => {
            return x.Cat === product;
        })
        setProduct(update);
    }

    const AllProducts = () => {
        setProduct(Productdetail)
    }

    // Hàm xử lý lọc sản phẩm:
    // const handleBrandchange = (event) => {
    //     const newValue = event.target.value;
    //     if(newValue === 'all') {
    //         setProduct('all');
    //         setProduct(Productdetail);
    //     }
    //     else {
    //         setProduct(newValue);;
    //         const filtterproduct = filterProductsByBrand(newValue);
    //         setProduct(filtterproduct);
    //     }
    // }

    // Hàm lọc sản phẩm theo Brand name:
    // const filterProductsByBrand = (product) => {
    //     switch(product) {
    //         case 'SamSung':
    //             return Productdetail.filter((product) => product.Brand === 'SamSung');
    //         case 'Apple':
    //             return Productdetail.filter((product) => product.Brand === 'Apple');
    //         case 'Vivo':
    //             return Productdetail.filter((product) => product.Brand === 'Vivo');
    //         case 'Nokia':
    //             return Productdetail.filter((product) => product.Brand === 'Nokia');
    //         case 'Oppo':
    //             return Productdetail.filter((product) => product.Brand === 'Oppo');
    //         case 'Realmi':
    //             return Productdetail.filter((product) => product.Brand === 'Realmi');
    //         case 'Xiaomi':
    //             return Productdetail.filter((product) => product.Brand === 'Xiaomi');
    //         case 'Huawei':
    //             return Productdetail.filter((product) => product.Brand === 'Huawei');
    //         default:
    //             return Productdetail
    //     }
    // }

    // Hàm xử lý lọc giá:
    const [priceRange, setPrice] = useState('all');
    const handlePriceChange = (event) => {
        const value = event.target.value;

        if (value === 'all') {
            setPrice('all');
            setProduct(Productdetail);
        } else {
            setPrice(value);
            const filteredProducts = filterProductsByPrice(value);
            setProduct(filteredProducts);
        }
    };

    // Hàm lọc sản phẩm theo mức giá:
    const filterProductsByPrice = (priceRange) => {
        switch (priceRange) {
            case '0-2':
                return Productdetail.filter((product) => product.Price <= 2000000);
            case '2-4':
                return Productdetail.filter((product) => product.Price > 2000000 && product.Price <= 4000000);
            case '4-7':
                return Productdetail.filter((product) => product.Price > 4000000 && product.Price <= 7000000);
            case '7-13':
                return Productdetail.filter((product) => product.Price > 7000000 && product.Price <= 13000000);
            case '13+':
                return Productdetail.filter((product) => product.Price > 13000000);
            default:
                return Productdetail;
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; // Tổng số trang

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Thực hiện truy vấn API hoặc cập nhật danh sách sản phẩm theo trang pageNumber
    };
    return (
        <>
            <div className='products'>
                <div className='grid'>
                    {/* <h2># Products</h2>
                     <p>Home . products</p> */}

                    <BannerProducts></BannerProducts>

                    <div className='products-list'>
                        <div className='grid__column-2'>
                            <nav className='categories'>
                                <h3 className='categories__heading'>Thương hiệu</h3>
                                <ul className='categories-list'>
                                    <li className='categories-item' onChange={product => AllProducts('all')}>
                                        <input className='categories-item__input' type='checkbox' id='all' name='all' value='all'></input>
                                        <label className='categories-item__label' htmlFor='all'>Tất cả</label>
                                    </li>
                                    <li className='categories-item' onChange={product => filtterproduct('SamSung')}>
                                        <input className='categories-item__input' type='checkbox' id='SamSung' name='SamSung' value='SamSung'></input>
                                        <label className='categories-item__label' htmlFor='SamSung'>SamSung</label>
                                    </li>
                                    <li className='categories-item' onChange={product => filtterproduct('Apple')}>
                                        <input className='categories-item__input' type='checkbox' id='Apple' value='Apple'></input>
                                        <label className='categories-item__label' htmlFor='Apple'>Apple</label>
                                    </li>
                                    <li className='categories-item' onChange={product => filtterproduct('Xiaomi')}>
                                        <input className='categories-item__input' type='checkbox' id='Xiaomi' value='Xiaomi'></input>
                                        <label className='categories-item__label' htmlFor='Xiaomi'>Xiaomi</label>
                                    </li>
                                    <li className='categories-item' onChange={product => filtterproduct('Huawei')}>
                                        <input className='categories-item__input' type='checkbox' id='Huawei' checkek={product === 'Huawei'} value='Huawei'></input>
                                        <label className='categories-item__label' htmlFor='Huawei'>Huawei</label>
                                    </li>
                                    <li className='categories-item' onChange={product => filtterproduct('Realmi')}>
                                        <input className='categories-item__input' type='checkbox' id='Realmi' value='Realmi'></input>
                                        <label className='categories-item__label' htmlFor='Realmi'>Realmi</label>
                                    </li>
                                    <li className='categories-item' onChange={product => filtterproduct('Nokia')}>
                                        <input className='categories-item__input' type='checkbox' id='Nokia' value='Nokia'></input>
                                        <label className='categories-item__label' htmlFor='Nokia'>Nokia</label>
                                    </li>
                                    <li className='categories-item' onChange={product => filtterproduct('Vivo')}>
                                        <input className='categories-item__input' type='checkbox' id='Vivo' value='Vivo'></input>
                                        <label className='categories-item__label' htmlFor='Vivo'>Vivo</label>
                                    </li>
                                    <li className='categories-item' onChange={product => filtterproduct('Oppo')}>
                                        <input className='categories-item__input' type='checkbox' id='Oppo' value='Oppo'></input>
                                        <label className='categories-item__label' htmlFor='Oppo'>Oppo</label>
                                    </li>
                                </ul>
                            </nav>

                            {/* CATEGORIES GIÁ */}
                            <nav className='categories'>
                                <h3 className='categories__heading'>Mức giá</h3>
                                <ul className='categories-list'>

                                    <li className='categories-item' onClick={handlePriceChange}>
                                        <input className='categories-item__input' type='checkbox' id='all' name='all' checked={priceRange === 'all'} value='all' />
                                        <label className='categories-item__label' htmlFor='all'>Tất cả</label>
                                    </li>
                                    <li className='categories-item' onClick={handlePriceChange}>
                                        <input className='categories-item__input' type='checkbox' id='0-2' name='0-2' checked={priceRange === '0-2'} value='0-2' />
                                        <label className='categories-item__label' htmlFor='0-2'>Dưới 2 triệu</label>
                                    </li>
                                    <li className='categories-item' onClick={handlePriceChange}>
                                        <input className='categories-item__input' type='checkbox' id='2-4' name='2-4' checked={priceRange === '2-4'} value='2-4' />
                                        <label className='categories-item__label' htmlFor='2-4'>2 - 4 triệu</label>
                                    </li>
                                    <li className='categories-item' onClick={handlePriceChange}>
                                        <input className='categories-item__input' type='checkbox' id='4-7' name='4-7' checked={priceRange === '4-7'} value='4-7' />
                                        <label className='categories-item__label' htmlFor='4-7'>4 - 7 triệu</label>
                                    </li>
                                    <li className='categories-item' onClick={handlePriceChange} >
                                        <input className='categories-item__input' type='checkbox' id='7-13' name='7-13' checked={priceRange === '7-13'} value='7-13' />
                                        <label className='categories-item__label' htmlFor='7-13'>7 - 13 triệu</label>
                                    </li>
                                    <li className='categories-item' onClick={handlePriceChange}>
                                        <input className='categories-item__input' type='checkbox' id='13+' name='13+' checked={priceRange === '13+'} value='13+' />
                                        <label className='categories-item__label' htmlFor='13+'>Trên 13 triệu</label>
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
                                                            <div className="home-product-item__rating">
                                                                <i className="home-product-item__star--gold fas fa-star"><AiOutlineStar /></i>
                                                                <i className="home-product-item__star--gold fas fa-star"><AiOutlineStar /></i>
                                                                <i className="home-product-item__star--gold fas fa-star"><AiOutlineStar /></i>
                                                                <i className="home-product-item__star--gold fas fa-star"><AiOutlineStar /></i>
                                                                <i className="home-product-item__star--gold fas fa-star"><AiOutlineStar /></i>
                                                            </div>
                                                            {/* <span className="home-product-item__sold">88 đã bán</span> */}
                                                        </div>
                                                        <div className="home-product-item__origin">
                                                            <span className="home-product-item__brand">{curElm.Brand}</span>
                                                            <span className="home-product-item__origin-name">{curElm.origin}</span>
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