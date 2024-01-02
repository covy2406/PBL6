import "./product.css";
import { React, useEffect } from "react";
import { useState } from "react";
import { AiOutlineDown, AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import BannerProducts from "../BannerProduct/BannerProducts.jsx";
import { Link } from "react-router-dom";
import apiProductHome from "api/apiProductHome.js";
import useAuth from "hook/useAuth.js";
import useCart from "hook/useCart";
import useCartHandle from "hook/useCartHandle";
import apiHandleBrand from "api/apiHandleBrand.js";
import { toast } from "react-toastify";
import apiHandlePrice from "api/apiHandlePrice";
// import useFilterHandle from "hook/useFilterHandle";
// import useFilter from "hook/useFilter";

const Product = () => {

    const { auth } = useAuth();
    const { view } = useCart();
    const { addtocart } = useCartHandle();
    // const { selectedBrandId , selectedBrandProducts ,setSelectedBrandProducts} = useFilter();
    // const {handleBrandCheckboxChange, handleShowAllProducts} = useFilterHandle();

    const [ProductNew, setProductNew] = useState([]);
    const [error, setError] = useState(null);

    //Brand:
    const [brands, setBrands] = useState([]); //brands: Lưu trữ danh sách các thương hiệu sản phẩm.
    const [selectedBrands, setSelectedBrands] = useState([]); // cac brand duoc chon(tich vao checkbox)
    //const [selectedBrandId, setSelectedBrandId] = useState(null); // Lưu trữ ID của thương hiệu đang được chọn.
    const [selectedBrandId, setSelectedBrandId] = useState([]);
    const [selectedBrandProducts, setSelectedBrandProducts] = useState([]);// selectedBrandProducts: Lưu trữ danh sách sản phẩm của thương hiệu được 
    const [filteredProducts, setFilteredProducts] = useState([]); //filteredProducts: Lưu trữ danh sách sản phẩm được lọc dựa trên các điều kiện nhất định.

    // Giá
    const [minPriceInput, setMinPriceInput] = useState('');
    const [maxPriceInput, setMaxPriceInput] = useState('');


    // goi api san pham:
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

    // goi api brand
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
    }, [selectedBrandId, selectedBrands, ProductNew]);

    // Lọc sản phẩm tương ứng với thương hiệu
    useEffect(() => {
        const filtered = (selectedBrandProducts && selectedBrandProducts.length > 0) ? selectedBrandProducts : ProductNew;
        setFilteredProducts(filtered);
    }, [selectedBrandProducts, ProductNew]);


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
    
    // ham xu ly show tat ca san pham
    const handleShowAllProducts = () => {
        setSelectedBrandId([]);
        //setSelectedBrandId(null)
        toast.success('Hiển thị tất cả các sản phẩm', { autoClose: 1000 });
    };

    // Ham call api gia:
    useEffect(() => {
        // Sử dụng hàm fetchPrice khi minPriceInput hoặc maxPriceInput thay đổi
        const fetchPrice = async () => {
            try {
                const response = await apiHandlePrice.getPrice(minPriceInput, maxPriceInput);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products by price:', error);
            }
        };

        fetchPrice();
    }, [minPriceInput, maxPriceInput]);

    // hàm xử lý áp dụng lọc giá
    const handleApplyFilter = () => {
        const convertToFloat = (value) => {
            const floatValue = parseFloat(value);
            return isNaN(floatValue) ? 0 : floatValue;
        };

        const minPriceValue = convertToFloat(minPriceInput);
        const maxPriceValue = convertToFloat(maxPriceInput);

        if (!isNaN(minPriceValue) && !isNaN(maxPriceValue) && minPriceValue <= maxPriceValue) {
            // Lọc sản phẩm theo giá nhập vào
            const filtered = selectedBrandProducts.filter(
                (product) => parseFloat(product.price) >= minPriceValue &&
                parseFloat(product.price) <= maxPriceValue
            );
            setFilteredProducts(filtered);
        } else {
            toast.error('Vui lòng nhập giá hợp lệ.', { autoClose: 1000 });
        }
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
                    <div className='grid__column-2'>

                        {/* BRAND CATEGORY - LỌC SẢN PHẨM THEO TÊN HÃNG VÀ GIÁ ĐIỆN THOẠI */}
                        {/* CATEGORY CHO TÊN BRAND */}
                        <nav className='categories'>
                            <ul className='categories-list'>
                                <h3 className='categories__heading'>Thương hiệu</h3>
                                {brands.map((brand) => (
                                    <li className='categories-item' key={brand.id}>
                                        <input
                                            className='categories-item__input'
                                            type='radio'
                                            checked={selectedBrandId === brand.id}
                                            //checked={selectedBrandId.includes(brand.id)}
                                            onChange={() => handleBrandCheckboxChange(brand.id)}
                                        ></input>
                                        <label className='categories-item__label'>{brand.name}</label>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* CATEGORIES GIÁ */}
                        <nav className='categories'>
                            <ul className='categories-list'>
                                <h3 className='categories__heading'>Mức giá</h3>
                                <div className="categories-list__price">
                                    <div className='categories-range' >
                                        <input
                                            type="text"
                                            placeholder="Min"
                                            value={minPriceInput}
                                            className="inputPrice"
                                            onChange={(e) => setMinPriceInput(e.target.value)}
                                        />
                                        <span className="priceRange"></span>
                                        <input
                                            type="text"
                                            placeholder="Max"
                                            value={maxPriceInput}
                                            className="inputPrice"
                                            onChange={(e) => setMaxPriceInput(e.target.value)}
                                        />
                                                
                                    </div>
                                    <button 
                                        className="btn btn--primary-main btn-filter" 
                                        onClick={() => handleApplyFilter()}
                                    >
                                    Áp dụng
                                    </button>
                                </div>
                            </ul>
                        </nav>
                    </div>

                    <div className="grid__column-10">
                        <div className="home-filter">
                            <span className="home-filter__label">Sắp xếp theo</span>
                            <button
                                className="btn home-filter__btn"
                                onClick={() => handleShowAllProducts()}
                            >Tất cả</button>
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
                                filteredProducts.map((curElmNew, index) => (
                                    <div className="box" key={index}>
                                        <div className="img_box">
                                            <img
                                                src={`http://0.tcp.ap.ngrok.io:15234/${curElmNew.image}`}
                                                //src={curElmNew.image}
                                                
                                                alt={curElmNew.name}></img>
                                            <div className="icon">
                                                {auth.isAuth ? (
                                                    <li onClick={() => addtocart(curElmNew.shop_product_id, 1)}>
                                                        <AiOutlineShoppingCart />
                                                    </li>
                                                ) : (
                                                    <li>
                                                        <AiOutlineShoppingCart />
                                                    </li>
                                                )}
                                                <li
                                                    className="icon__link"
                                                    onClick={() => view(curElmNew.shop_product_id)}>
                                                    <Link to={`Viewdetail/${curElmNew.shop_product_id}`}>
                                                        <BsEye />
                                                    </Link>
                                                </li>
                                            </div>
                                        </div>
                                        <div className="detail">
                                            <h4 className="home-product-item__name">{curElmNew.name}</h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old"> </span>
                                                <span className="home-product-item__price-current">
                                                    {parseInt(curElmNew.price).toLocaleString("vn-VN")} đ
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
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand">
                                                    {curElmNew.shopName}
                                                </span>
                                                <span className="home-product-item__origin-name">
                                                    {curElmNew.origin}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
