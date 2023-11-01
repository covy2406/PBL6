import React from "react";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import icon from "../Icon";
import Homeproduct from "./homeproduct";
import "../../assets/css/home.css";
import "../../assets/css/base.css";
import BannerSlider from "../BannerHome/BannerSlider.js";
//import ProductSlider from './ProductSlider';
import BannerProducts from "../BannerProduct/BannerProducts";
//import ProductSlider from './ProductSlider.js';

const Home = ({ detail, view, close, setClose, addtocart }) => {
  return (
    <>
      {close ? (
        <div className="product_detail">
          <div className="container">
            <button onClick={() => setClose(false)} className="closebtn">
              <icon.AiOutlineCloseCircle />
            </button>
            {detail.map((curElm) => {
              return (
                <div className="productbox">
                  <div className="img-box">
                    <img src={curElm.Img} alt={curElm.Title}></img>
                  </div>
                  <div className="detail">
                    <h4>{curElm.Cat}</h4>
                    <h2>{curElm.Title}</h2>
                    <p>
                      A Screen Everyone Will Love: Whether your family is
                      streaming or video chatting with friends tablet A8...{" "}
                    </p>
                    <h3>{curElm.Price}</h3>
                    <button>Add To Cart</button>
                  </div>
                </div>
              );
            })}
            <div className="productbox"></div>
          </div>
        </div>
      ) : null}
      {/* BANNER SLIDER DYNAMIC */}

      <BannerSlider></BannerSlider>

      {/* SẢN PHẨM NỔI BẬT */}
      <div className="grid">
        <div className="product_type">
          <div className="container">
            <div className="box">
              <div className="img_box">
                <img src="./img/sanpham1.jpg" alt="mobile"></img>
              </div>
              <div className="detail">
                <p>Điện thoại Iphone 15 promax 32tr đồng</p>
              </div>
            </div>
            <div className="box">
              <div className="img_box">
                <img src="./img/sanpham2.jpg" alt="mobile"></img>
              </div>
              <div className="detail">
                <p>SamSung Galaxy ultra 23</p>
              </div>
            </div>
            <div className="box">
              <div className="img_box">
                <img src="./img/sanpham3.jpg" alt="mobile"></img>
              </div>
              <div className="detail">
                <p>Xiaomi Redmi note</p>
              </div>
            </div>
            <div className="box">
              <div className="img_box">
                <img src="./img/sanpham1.jpg" alt="mobile"></img>
              </div>
              <div className="detail">
                <p>Iphone 15pro max</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <ProductSlider></ProductSlider> */}
      {/* ABOUT */}
      <div className="grid">
        <div className="about">
          <div className="container">
            <div className="box">
              <div className="icon">
                <icon.FiTruck />
              </div>
              <div className="detail">
                <h2>Miễn phí vận chuyển</h2>
                <p>Khi mua hàng trên 1000$</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <icon.BsCurrencyDollar />
              </div>
              <div className="detail">
                <h2>Chi trả nhanh & hoàn tiền nhanh</h2>
                <p>Đảm bảo an toàn khi giao dịch</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <icon.CiPercent />
              </div>
              <div className="detail">
                <h2>Giảm giá thành viên</h2>
                <p>Nhiều ưu đãi khi trở thành viên viên</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <icon.BiHeadphone />
              </div>
              <div className="detail">
                <h2>Hổ trợ khách hàng</h2>
                <p>Hổ trợ khách hàng 24/24 mỗi khi khách gọi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SẢN PHẨM Ở TRANG CHÍNH */}
      <div className="grid">
        <div className="product">
          <h2 className="product_item_name">Sản phẩm nổi bật</h2>
          <div className="container">
            {Homeproduct.map((curElm) => {
              return (
                <div className="box" key={curElm.id}>
                  <div className="img_box">
                    <img
                      className="product-main__item"
                      src={curElm.Img}
                      alt={curElm.Title}></img>
                    <div className="icon">
                      <li onClick={() => addtocart(curElm)}>
                        <icon.AiOutlineShoppingCart />
                      </li>
                      <li onClick={() => view(curElm)}>
                        <icon.BsEye />
                      </li>
                      <li>
                        <icon.AiOutlineHeart />
                      </li>
                    </div>
                  </div>
                  <div className="detail">
                    <h4 class="home-product-item__name">{curElm.Title}</h4>
                    <div class="home-product-item__price">
                      <span class="home-product-item__price-old">
                        {curElm.Price_old} đ
                      </span>
                      <span class="home-product-item__price-current">
                        {curElm.Price} đ
                      </span>
                    </div>
                    <div class="home-product-item__origin">
                      <span class="home-product-item__brand">
                        {curElm.Brand}
                      </span>
                      <span class="home-product-item__origin-name">
                        {curElm.origin}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <BannerProducts>
        <Link to="/product" className="link">
          Shop Now <icon.BsArrowRight />
        </Link>
      </BannerProducts>
      {/* <div className='grid'>
                <div className='banner__two'>
                    <div className='banner__two-container'>
                        <div className='detail'>
                            <h4>LATEST TECHNOLOGY ADDED</h4>
                            <h3>Apple iPad 10.2 9th Gen - 2021</h3>
                            <p>$ 986</p>
                            <Link to='/product' className='link'>Shop Now  <BsArrowRight /></Link>
                        </div>
                        <div className='img_box'>
                            <img src='./img/dienthoai.jpg' alt='sliderimg'></img>
                        </div>
                    </div>
                </div>
            </div> */}
      <div className="grid">
        <div className="product">
          <h2 className="product_item_name">Deal ngon - Giá luôn rẻ</h2>
          <div className="container">
            {Homeproduct.map((curElm) => {
              return (
                <div className="box" key={curElm.id}>
                  <div className="img_box">
                    <img
                      className="product-main__item"
                      src={curElm.Img}
                      alt={curElm.Title}></img>
                    <div className="icon">
                      <li onClick={() => addtocart(curElm)}>
                        <icon.AiOutlineShoppingCart />
                      </li>
                      <li onClick={() => view(curElm)}>
                        <icon.BsEye />
                      </li>
                      <li>
                        <icon.AiOutlineHeart />
                      </li>
                    </div>
                  </div>
                  <div className="detail">
                    {/* <p>{curElm.Cat}</p>
                                            <h3>{curElm.Title}</h3>
                                            <h4>${curElm.Price}</h4> */}
                    <h4 class="home-product-item__name">{curElm.Title}</h4>
                    <div class="home-product-item__price">
                      <span class="home-product-item__price-old">
                        {curElm.Price_old} đ
                      </span>
                      <span class="home-product-item__price-current">
                        {curElm.Price} đ
                      </span>
                    </div>
                    <div class="home-product-item__origin">
                      <span class="home-product-item__brand">
                        {curElm.Brand}
                      </span>
                      <span class="home-product-item__origin-name">
                        {curElm.origin}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home; //BannerSlider;
