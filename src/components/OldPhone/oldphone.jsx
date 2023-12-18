import { React, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
//import oldphoneData from './oldPhoneData';
import "../NewProduct/product.css";
// import '../Header/nav.css';
import "../../assets/css/base.css";
import "../Home/home.css";
import "./secondHand.css";
import BannerProducts from "components/BannerProduct/BannerProducts";
import CategoryOld from "./CategoryOld";
import Pagination from "../Pagination/Pagination.jsx";
import oldPhoneData from "./oldPhoneData";

import useAuth from "hook/useAuth";

const Oldphone = ({ view, addtocart }) => {
  // oldData, setOldproduct,
  const [oldData, setOldproduct] = useState(oldPhoneData);

  const { auth } = useAuth();

  const [pagination] = useState({
    _page: 1,
    _limit: 9,
    _totalRows: 11,
  });

  const handlePageChange = (newPage) => {
    console.log("New page: " + newPage);
    // setCurrentPage(pageNumber);
    // Thực hiện truy vấn API hoặc cập nhật danh sách sản phẩm theo trang pageNumber
  };

  return (
    <div className="products">
      <div className="grid">
        {/* <h2># Products</h2>
                    <p>Home . products</p> */}

        <BannerProducts />

        <div className="products-list">
          <CategoryOld oldData={oldData} setOldproduct={setOldproduct} />
          {/* <div className='grid__column-2'>
                        <nav className='categories'>
                            <ul className='categories-list'>
                                <h3 className='categories__heading'>categories</h3>
                                <li className='categories-item' onChange={() => AllProducts()}>
                                    <input className='categories-item__input' type='checkbox' id='all' name='all'></input>
                                    <label className='categories-item__label' htmlFor='all'>Tất cả</label>
                                </li>
                                <li className='categories-item' onChange={() => filtterproduct("SamSung")}>
                                    <input className='categories-item__input' type='checkbox' id='SamSung' name='SamSung' ></input>
                                    <label className='categories-item__label' htmlFor='SamSung'>SamSung</label>
                                </li>
                                <li className='categories-item' onChange={() => filtterproduct("Apple")}>
                                    <input className='categories-item__input' type='checkbox' id='Apple'></input>
                                    <label className='categories-item__label' htmlFor='Apple'>Apple</label>
                                </li>
                                <li className='categories-item' onChange={() => filtterproduct("Xiaomi")}>
                                    <input className='categories-item__input' type='checkbox' id='Xiaomi'></input>
                                    <label className='categories-item__label' htmlFor='Xiaomi'>Xiaomi</label>
                                </li>
                                <li className='categories-item' onChange={() => filtterproduct("Huawei")}>
                                    <input className='categories-item__input' type='checkbox' id='Huawei'></input>
                                    <label className='categories-item__label' htmlFor='Huawei'>Huawei</label>
                                </li>
                                <li className='categories-item' onChange={() => filtterproduct("Realmi")}>
                                    <input className='categories-item__input' type='checkbox' id='Realmi'></input>
                                    <label className='categories-item__label' htmlFor='Realmi'>Realmi</label>
                                </li>
                                <li className='categories-item' onChange={() => filtterproduct("Nokia")}>
                                    <input className='categories-item__input' type='checkbox' id='Nokia'></input>
                                    <label className='categories-item__label' htmlFor='Nokia'>Nokia</label>
                                </li>
                                <li className='categories-item' onChange={() => filtterproduct("Vivo")}>
                                    <input className='categories-item__input' type='checkbox' id='Vivo'></input>
                                    <label className='categories-item__label' htmlFor='Vivo'>Vivo</label>
                                </li>
                            </ul>
                        </nav>

                        <nav className='categories'>
                            <ul className='categories-list'>
                                <h3 className='categories__heading'>Mức giá</h3>
                                <li className='categories-item' onChange={handlePriceChange}>
                                    <input className='categories-item__input' type='checkbox' id='all' name='all' defaultChecked={priceRange === 'all'} value='all' />
                                    <label className='categories-item__label' htmlFor='all'>Tất cả</label>
                                </li>
                                <li className='categories-item' onChange={handlePriceChange}>
                                    <input className='categories-item__input' type='checkbox' id='0-2' name='0-2' defaultChecked={priceRange === '0-2'} value='0-2' />
                                    <label className='categories-item__label' htmlFor='0-2'>Dưới 2 triệu</label>
                                </li>
                                <li className='categories-item' onChange={handlePriceChange}>
                                    <input className='categories-item__input' type='checkbox' id='2-4' name='2-4' defaultChecked={priceRange === '2-4'} value='2-4' />
                                    <label className='categories-item__label' htmlFor='2-4'>2 - 4 triệu</label>
                                </li>
                                <li className='categories-item' onChange={handlePriceChange}>
                                    <input className='categories-item__input' type='checkbox' id='4-7' name='4-7' defaultChecked={priceRange === '4-7'} value='4-7' />
                                    <label className='categories-item__label' htmlFor='4-7'>4 - 7 triệu</label>
                                </li>
                                <li className='categories-item' onChange={handlePriceChange} >
                                    <input className='categories-item__input' type='checkbox' id='7-13' name='7-13' defaultChecked={priceRange === '7-13'} value='7-13' />
                                    <label className='categories-item__label' htmlFor='7-13'>7 - 13 triệu</label>
                                </li>
                                <li className='categories-item' onChange={handlePriceChange}>
                                    <input className='categories-item__input' type='checkbox' id='13+' name='13+' defaultChecked={priceRange === '13+'} value='13+' />
                                    <label className='categories-item__label' htmlFor='13+'>Trên 13 triệu</label>
                                </li>
                            </ul>
                        </nav>
                    </div> */}
          <div className="grid__column-10">
            <div className="home-filter">
              <span className="home-filter__label">Sắp xếp theo</span>
              <button className="btn home-filter__btn ">Phổ biến</button>
              <button className="btn home-filter__btn btn--primary ">
                Mới nhất
              </button>
              <button className="btn home-filter__btn">Bán chạy</button>

              <div className="select-input">
                <span className="select-input__label">Giá</span>
                <i className="select-input__icon ">
                  <AiOutlineDown />
                </i>
                <ul className="select-input__list">
                  <li className="select-input__item">
                    <a href="/" className="select-input__link">
                      Giá: Cao đến thấp
                    </a>
                  </li>
                  <li className="select-input__item">
                    <a href="/" className="select-input__link">
                      Giá: Thấp đến cao
                    </a>
                  </li>
                </ul>
              </div>

              <div className="home-filter__page">
                <span className="home-filter__page-num">
                  <span className="home-filter__page-current">1</span>/14
                </span>
                <div className="home-filter__page-control">
                  <a
                    href="/"
                    className="home-filter__page-btn home-filter__page-btn--disabled">
                    <i className="home-filter__page-icon ">
                      <AiOutlineLeft />
                    </i>
                  </a>
                  <a href="/" className="home-filter__page-btn">
                    <i className="home-filter__page-icon">
                      <AiOutlineRight />
                    </i>
                  </a>
                </div>
              </div>
            </div>
            <div className="contant">
              {oldData.map((curElm) => {
                return (
                  <div className="box" key={curElm.id}>
                    <div className="img_box">
                      <img src={curElm.Img} alt={curElm.Title}></img>
                      <div className="icon">
                        {auth.isAuth ? (
                          <li onClick={() => addtocart(curElm)}>
                            <AiOutlineShoppingCart />
                          </li>
                        ) : (
                          <li>
                            <AiOutlineShoppingCart />
                          </li>
                        )}
                        <li className="icon__link" onClick={() => view(curElm)}>
                          <Link to="../Viewdetail">
                            <BsEye />
                          </Link>
                        </li>
                        {/* <li><AiOutlineHeart /></li> */}
                      </div>
                    </div>
                    <div className="detail">
                      <h4 className="home-product-item__name">
                        {curElm.Title}
                      </h4>
                      <div className="home-product-item__price">
                        <span className="home-product-item__price-old">
                          {curElm.Price_old} đ
                        </span>
                        <span className="home-product-item__price-current">
                          {curElm.price} đ
                        </span>
                      </div>
                      <div className="home-product-item__action">
                        {/* <!-- class khi đưa vào thì tym đỏ, ko có thì ko màu: home-product-item__like--liked --> */}
                        {/* <span className="home-product-item__like ">
                                                        <i className="home-product-item__like-icon-empty far fa-heart"></i>
                                                        <i className="home-product-item__like-icon-fill fas fa-heart"></i>
                                                    </span> */}
                        <div className="home-product-item__rating">
                          <i className="home-product-item__star--gold fas fa-star">
                            <AiOutlineStar />
                          </i>
                          <i className="home-product-item__star--gold fas fa-star">
                            <AiOutlineStar />
                          </i>
                          <i className="home-product-item__star--gold fas fa-star">
                            <AiOutlineStar />
                          </i>
                          <i className="home-product-item__star--gold fas fa-star">
                            <AiOutlineStar />
                          </i>
                          <i className="home-product-item__star--gold fas fa-star">
                            <AiOutlineStar />
                          </i>
                        </div>
                        {/* <span className="home-product-item__sold">88 đã bán</span> */}
                      </div>
                      <div className="home-product-item__origin">
                        <span className="home-product-item__brand">
                          {curElm.Brand}
                        </span>
                        <span className="home-product-item__origin-name">
                          {curElm.origin}
                        </span>
                      </div>
                      <div className="home-product-item__price-plus">
                        <div className="home-product-item__price-new">
                          Giá máy mới: <strong>{curElm.Price_new} đ</strong>
                        </div>
                        <div className="home-product-item__price-save">
                          Tiết kiệm: <strong>{curElm.Price_save} đ</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oldphone;
