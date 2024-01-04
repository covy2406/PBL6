import { React, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination.jsx";
import useAuth from "hook/useAuth.js";
import useCart from "hook/useCart";
import useCartHandle from "hook/useCartHandle";
import apiOldProduct from "api/apiOldProduct";
import apiHandleBrand from "api/apiHandleBrand";
import apiHandlePrice from "api/apiHandlePrice";

const Oldphone = () => {
  // oldData, setOldproduct,
  const { auth } = useAuth();
  const { view } = useCart();
  const { addtocart } = useCartHandle();
  const [oldProduct, setOldproduct] = useState([]);
  const [error, setError] = useState(null);

  //brand:
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedBrandProducts, setSelectedBrandProducts] = useState([]);
  const [, setFilteredProducts] = useState([]);

  // Giá
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  //call api san pham cu:
  useEffect(() => {
    const fetchOldProduct = async (isOld) => {
      try {
        const res = await apiOldProduct.getOldProduct(isOld);
        setOldproduct(res.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchOldProduct();
  }, []);

  // goi api brand
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await apiHandleBrand.getAllBrand();
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Danh sach san pham cua thuong hieu
  useEffect(() => {
    const getProductsByBrand = async () => {
      try {
        if (selectedBrandId) {
          console.log("selected:", selectedBrandId);
          const response = await apiHandleBrand.getShopProductbyBrand(
            selectedBrandId
          );
          setSelectedBrandProducts(response.data);
        } else {
          setSelectedBrandProducts(oldProduct);
        }
      } catch (error) {
        console.error("Error fetching products by brand:", error);
      }
    };
    getProductsByBrand();
  }, [selectedBrandId, selectedBrands, oldProduct]);

  // Lọc sản phẩm tương ứng với thương hiệu
  useEffect(() => {
    const filtered =
      selectedBrandProducts && selectedBrandProducts.length > 0
        ? selectedBrandProducts
        : oldProduct;
    setFilteredProducts(filtered);
  }, [selectedBrandProducts, oldProduct]);

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

  const handleShowAllProducts = () => {
    // Đặt selectedBrandId về giá trị null để hiển thị tất cả sản phẩm
    setSelectedBrandId(null);
    setSelectedBrands([]);
    toast.success("Hiển thị tất cả các sản phẩm", { autoClose: 1000 });
  };

  // Ham call api gia:
  useEffect(() => {
    // Sử dụng hàm fetchPrice khi minPriceInput hoặc maxPriceInput thay đổi
    const fetchPrice = async () => {
      try {
        const response = await apiHandlePrice.getPrice(
          minPriceInput,
          maxPriceInput
        );
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products by price:", error);
      }
    };

    fetchPrice();
  }, [minPriceInput, maxPriceInput]);

  // hàm xử lý áp dụng lọc giá
  const handleApplyFilter = () => {
    const minPriceValue = parseFloat(minPriceInput);
    const maxPriceValue = parseFloat(maxPriceInput);

    if (
      !isNaN(minPriceValue) &&
      !isNaN(maxPriceValue) &&
      minPriceValue <= maxPriceValue
    ) {
      // Lọc sản phẩm theo khoảng giá nhập vào
      const filtered = selectedBrandProducts.filter(
        (product) =>
          parseFloat(product.price) >= minPriceValue &&
          parseFloat(product.price) <= maxPriceValue
      );
      setFilteredProducts(filtered);
    } else {
      // Hiển thị thông báo lỗi nếu giá nhập vào không hợp lệ
      toast.error("Vui lòng nhập giá hợp lệ.", { autoClose: 1000 });
    }
  };

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

  if (error) {
    return <p>error: {error.message}</p>;
  }

  return (
    <div className="products">
      <div className="grid">
        {/* <h2># Products</h2>
                    <p>Home . products</p> */}

        <BannerProducts />

                <div className="products-list">
                    {/* <CategoryOld oldData={oldData} setOldproduct={setOldproduct} /> */}
                    <div className='grid__column-2'>
                        <nav className='categories'>
                            <ul className='categories-list'>
                                <h3 className='categories__heading'>Thương hiệu</h3>
                                {brands.map((brand) => (
                                    <li className='categories-item' key={brand.id}>
                                        <input
                                            className='categories-item__input'
                                            type='radio'
                                            checked={selectedBrandId === brand.id}
                                            onChange={() => handleBrandCheckboxChange(brand.id)}
                                        ></input>
                                        <label className='categories-item__label'>{brand.name}</label>
                                    </li>
                                ))}
                            </ul>
                        </nav>

            <nav className="categories">
              <ul className="categories-list">
                <h3 className="categories__heading">Mức giá</h3>
                <div className="categories-list__price">
                  <div className="categories-range">
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
                    onClick={handleApplyFilter}>
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
                onClick={() => handleShowAllProducts()}>
                Tất cả
              </button>
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
              {oldProduct.map((curElm, index) => {
                return (
                  <div className="box" key={index}>
                    <div className="img_box">
                      <img
                        src={`http://0.tcp.ap.ngrok.io:15234/${curElm.image}`}
                        alt={curElm.name}></img>
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
                          <Link to={`Viewdetail/${curElm.shop_product_id}`}>
                            <BsEye />
                          </Link>
                        </li>
                        {/* <li><AiOutlineHeart /></li> */}
                      </div>
                    </div>
                    <div className="detail">
                      <h4 className="home-product-item__name">{curElm.name}</h4>
                      <div className="home-product-item__description">
                        {curElm.description}
                      </div>
                      <div className="home-product-item__price">
                        <span className="home-product-item__price-old"></span>
                        <span className="home-product-item__price-current">
                          {parseInt(curElm.price).toLocaleString("vn-VN")} đ
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
                      {/* <div className="home-product-item__price-plus">
                                                <div className="home-product-item__price-new">
                                                    Giá máy mới: <strong>{curElm.Price_new} đ</strong>
                                                </div>
                                                <div className="home-product-item__price-save">
                                                    Tiết kiệm: <strong>{curElm.Price_save} đ</strong>
                                                </div>
                                            </div> */}
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
