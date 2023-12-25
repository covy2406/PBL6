import { React, useEffect } from "react";
import { useState } from "react";
import { AiOutlineDown, AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import BannerProducts from "../BannerProduct/BannerProducts.jsx";
import { Link } from "react-router-dom";
import "./product.css";
import "../../assets/css/base.css";
import "../Home/home.css";
import apiProductHome from "api/apiProductHome.js";
import useAuth from "hook/useAuth.js";
import useCart from "hook/useCart";
import useCartHandle from "hook/useCartHandle";
import apiHandleBrand from "api/apiHandleBrand.js";

const Product = () => {

    const { auth } = useAuth();
    const { view } = useCart();
    const { addtocart } = useCartHandle();

    const [ProductNew, setProductNew] = useState([]);
    const [error, setError] = useState(null);

    //Brand:
    const [brands, setBrands] = useState([]); //brands: Lưu trữ danh sách các thương hiệu sản phẩm.
    //Cập nhật state brands bằng danh sách các thương hiệu lấy từ API.

    const [selectedBrands, setSelectedBrands] = useState([]); // cac brand duoc chon(tich vao checkbox)
    // và Lưu trữ danh sách thương hiệu được chọn từ checkbox.

    const [selectedBrandId, setSelectedBrandId] = useState(null); // Lưu trữ ID của thương hiệu đang được chọn.
    const [selectedBrandProducts, setSelectedBrandProducts] = useState([]);// selectedBrandProducts: Lưu trữ danh sách sản phẩm của thương hiệu được 
    // setSelectedBrandProducts(response.data); Cập nhật state selectedBrandProducts bằng danh sách sản phẩm của thương hiệu được chọn từ API.

    const [filteredProducts, setFilteredProducts] = useState([]); //filteredProducts: Lưu trữ danh sách sản phẩm được lọc dựa trên các điều kiện nhất định.

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

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await apiHandleBrand.getAllBrand();
                setBrands(response.data);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchBrands();
    }, []);

    useEffect(() => {
        const getProductsByBrand = async () => {
            try {
                if (selectedBrandId) {
                    console.log("selected:", selectedBrandId);
                    const response = await apiHandleBrand.getShopProductbyBrand(selectedBrandId);
                    setSelectedBrandProducts(response.data);
                }
                else {
                    setSelectedBrandProducts(ProductNew);
                }
            } catch (error) {
                console.error('Error fetching products by brand:', error);
            }
        };
        getProductsByBrand();
    }, [selectedBrandId, selectedBrands]);


    useEffect(() => {
        setFilteredProducts(
            selectedBrandProducts.length > 0 ? selectedBrandProducts : ProductNew
        );
    }, [selectedBrandProducts, ProductNew, selectedBrands, selectedBrandId]);


    const handleBrandCheckboxChange = (brandId) => {
        console.log(brandId);
        setSelectedBrandId(brandId);
        setSelectedBrands((prevBrands) => {
            if (prevBrands.includes(brandId)) {
                return prevBrands.filter((id) => id !== brandId);
            } else {
                return [...prevBrands, brandId];
            }
        });
    };

    if (error) {
        return <p>error: {error.message}</p>;
    }

    return (
        <div className="products">
            <div className="grid">

                {/* BANNER QUẢNG CÁO CHO TRANG PRODUCT - ĐIỆN THOẠI MỚI */}
                <BannerProducts />

                <div className="products-list">

                    {/* BRAND CATEGORY - LỌC SẢN PHẨM THEO TÊN HÃNG VÀ GIÁ ĐIỆN THOẠI */}
                    {/* <Category product={ProductNew} setProduct={setProductNew} /> */}
                    <div className='grid__column-2'>
                        {/* CATEGORY CHO TÊN BRAND */}

                        <nav className='categories'>
                            <ul className='categories-list'>
                                <h3 className='categories__heading'>Thương hiệu</h3>
                                {brands.map((brand) => (
                                    <li className='categories-item' key={brand.id}>
                                        <input
                                            className='categories-item__input'
                                            type='checkbox'
                                            // checked={selectedBrands.includes(brand.id === selectedBrandId)}
                                            checked={selectedBrandId === brand.id}
                                            onChange={() => handleBrandCheckboxChange(brand.id)}

                                        >
                                        </input>
                                        <label className='categories-item__label'>{brand.name}</label>
                                        {/* html='all' */}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* CATEGORIES GIÁ */}
                        <nav className='categories'>
                            <ul className='categories-list'>
                                <h3 className='categories__heading'>Mức giá</h3>
                                <li className='categories-item' >
                                    <input className='categories-item__input' type='checkbox' />
                                    <label className='categories-item__label' htmlFor='all'>Tất cả</label>
                                </li>
                            </ul>
                        </nav>
                    </div>

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
                            {
                                (!selectedBrandProducts) ? (
                                    ProductNew.map((curElm) => (
                                        <div className="box" key={curElm.shop_product_id}>
                                            <div className="img_box">
                                                <img
                                                    src={`http://0.tcp.ap.ngrok.io:15234/${curElm.image}`}
                                                    alt={curElm.name}></img>
                                                <div className="icon">
                                                    {auth.isAuth ? (
                                                        <li onClick={() => addtocart(curElm.shop_product_id, 1)}>
                                                            <AiOutlineShoppingCart />
                                                        </li>
                                                    ) : (
                                                        <li>
                                                            <AiOutlineShoppingCart />
                                                        </li>
                                                    )}
                                                    <li
                                                        className="icon__link"
                                                        onClick={() => view(curElm.shop_product_id)}>
                                                        <Link to={`Viewdetail/${curElm.shop_product_id}`}>
                                                            <BsEye />
                                                        </Link>
                                                    </li>
                                                </div>
                                            </div>
                                            <div className="detail">
                                                <h4 className="home-product-item__name">{curElm.name}</h4>
                                                <div className="home-product-item__price">
                                                    <span className="home-product-item__price-old"> </span>
                                                    <span className="home-product-item__price-current">
                                                        {parseInt(curElm.price).toLocaleString("vn-VN")} đ
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
                                    ))
                                ) : (
                                    selectedBrandProducts.map((curElm) => (
                                        <div className="box" key={curElm.shop_product_id}>
                                            <div className="img_box">
                                                <img
                                                    src={`http://0.tcp.ap.ngrok.io:15234/${curElm.image}`}
                                                    alt={curElm.name}></img>
                                                <div className="icon">
                                                    {auth.isAuth ? (
                                                        <li onClick={() => addtocart(curElm.shop_product_id, 1)}>
                                                            <AiOutlineShoppingCart />
                                                        </li>
                                                    ) : (
                                                        <li>
                                                            <AiOutlineShoppingCart />
                                                        </li>
                                                    )}
                                                    <li
                                                        className="icon__link"
                                                        onClick={() => view(curElm.shop_product_id)}>
                                                        <Link to={`Viewdetail/${curElm.shop_product_id}`}>
                                                            <BsEye />
                                                        </Link>
                                                    </li>
                                                </div>
                                            </div>
                                            <div className="detail">
                                                <h4 className="home-product-item__name">{curElm.name}</h4>
                                                <div className="home-product-item__price">
                                                    <span className="home-product-item__price-old"> </span>
                                                    <span className="home-product-item__price-current">
                                                        {parseInt(curElm.price).toLocaleString("vn-VN")} đ
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
                                    ))
                                )
                            } 
                                
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
