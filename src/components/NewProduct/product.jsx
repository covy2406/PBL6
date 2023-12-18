import { React, useEffect } from "react";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import BannerProducts from "../BannerProduct/BannerProducts.jsx";
// import Pagination from '../Pagination/Pagination.jsx';
// import Productdetail from '../Productdetail/Productdetail.jsx';
import "./product.css";
import "../../assets/css/base.css";
import "../Home/home.css";
import Category from "./Category.jsx";
import apiProductHome from "api/apiProductHome.js";

//import PaginationControlled from './PaginationControlled.jsx';

const Product = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 10; // Tổng số trang
  // const [fillter, setfillters] = useState({
  //     _limit: 10,
  //     _page: 1,
  // });

    const [ProductNew, setProductNew] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fectchProductNew = async () => {
            try {
                const response = await apiProductHome.getAll();
                setProductNew(response.data);
            } catch (error) {
                setError(error);
            }
        };
        fectchProductNew();
    }, []);

    if (error) {
        return <p>error: {error.message}</p>;
    }

    // const [pagination, setPagination] = useState({
    //     _page: 1,
    //     _limit: 9,
    //     _totalRows: 11
    // })

    // const handlePageChange = (newPage) => {
    //     console.log('New page: ' + newPage)
    //     // setCurrentPage(pageNumber);
    //     // Thực hiện truy vấn API hoặc cập nhật danh sách sản phẩm theo trang pageNumber
    // };
    return (
        <div className="products">
            <div className="grid">
                {/* <h2># Products</h2>
                    <p>Home . products</p> */}

                {/* BANNER QUẢNG CÁO CHO TRANG PRODUCT - ĐIỆN THOẠI MỚI */}
                <BannerProducts />

                <div className="products-list">
                    {/* BRAND CATEGORY - LỌC SẢN PHẨM THEO TÊN HÃNG VÀ GIÁ ĐIỆN THOẠI */}
                    <Category product={ProductNew} setProduct={setProductNew} />

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
              {ProductNew.map((curElm) => {
                return (
                  <div className="box" key={curElm.shop_product_id}>
                    <div className="img_box">
                      <img
                        src={`http://0.tcp.ap.ngrok.io:12354/${curElm.image}`}
                        alt={curElm.name}></img>
                    </div>
                    <div className="detail">
                      <h4 className="home-product-item__name">{curElm.name}</h4>
                      <div className="home-product-item__price">
                        <span className="home-product-item__price-old"> </span>
                        <span className="home-product-item__price-current">
                          {curElm.price} đ
                        </span>
                      </div>
                      <div className="home-product-item__action">
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
                          {curElm.shopName}
                        </span>
                        <span className="home-product-item__origin-name">
                          {curElm.origin}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* PHÂN TRANG: PAGINATION */}
            {/* <Pagination pagination = {pagination} onPageChange={handlePageChange} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
