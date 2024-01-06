import "./product.css";
import { React, useEffect } from "react";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { AiOutlineStar } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import BannerProducts from "../BannerProduct/BannerProducts.jsx";
import { Link } from "react-router-dom";
import useAuth from "hook/useAuth.js";
import useCart from "hook/useCart";
import useCartHandle from "hook/useCartHandle";
import useBrand from "hook/useBrand";
import { toast } from "react-toastify";
import apiHandlePrice from "api/apiHandlePrice";
import { set } from "date-fns";

const Product = () => {
  const { getAllBrands } = useBrand();
  const { auth, url } = useAuth();
  const { view } = useCart();
  const { addtocart, fetchProductHome } = useCartHandle();

  //Brand:
  const [brands, setBrands] = useState([]); //brands: Lưu trữ danh sách các thương hiệu sản phẩm.

  const [filter, setFilter] = useState("all"); //filter: Lưu trữ điều kiện lọc sản phẩm.
  const [allProducts, setAllProducts] = useState([]); //allProducts: Lưu trữ danh sách tất cả sản phẩm [không lọc
  const [filteredProducts, setFilteredProducts] = useState([]); //filteredProducts: Lưu trữ danh sách sản phẩm được lọc dựa trên các điều kiện nhất định.

  // Giá
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  // Lây danh sách sản phẩm và thương hiệu
  useEffect(() => {
    fetchProductHome().then((res) => {
      setFilteredProducts(res);
      setAllProducts(res);
    });
    getAllBrands().then((res) => {
      setBrands(res);
    });
  }, []);

  // Lọc theo brand
  const handleBrandCheck = (checked, brandID) => {
    // Update the checked status of the brand
    setBrands((prevBrands) =>
      prevBrands.map((brand) =>
        brand.id === brandID ? { ...brand, checked } : brand
      )
    );
    setFilter("brand");
    if (!checked) {
      !brands.some((brand) => brand.checked) && setFilter("all");
    }
  };

  // Lọc theo khoảng giá
  const handleMoneyRangeFilter = () => {
    if (minPriceInput && maxPriceInput) {
      const fetchPrice = async () => {
        try {
          const response = await apiHandlePrice.getPrice(
            parseInt(minPriceInput),
            parseInt(maxPriceInput)
          );
          setFilteredProducts(response.data);
        } catch (error) {
          console.error("Error fetching products by price:", error);
        }
      };
      fetchPrice();
    } else {
      toast.error("Vui lòng nhập giá hợp lệ.", { autoClose: 1000 });
    }
  };

  // Lọc theo bán chạy
  const handlePopularFilter = () => {
    const sortedProducts = [...filteredProducts].sort(
      (a, b) => b.soldQuantity - a.soldQuantity
    );
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="products">
      <div className="grid">
        {/* BANNER QUẢNG CÁO CHO TRANG PRODUCT - ĐIỆN THOẠI MỚI */}
        <BannerProducts />
        <div className="products-list">
          <div className="grid__column-2">
            {/* BRAND CATEGORY - LỌC SẢN PHẨM THEO TÊN HÃNG VÀ GIÁ ĐIỆN THOẠI */}
            {/* CATEGORY CHO TÊN BRAND */}
            <nav className="categories">
              <ul className="categories-list">
                <h3 className="categories__heading">Thương hiệu</h3>
                {brands.map((brand) => (
                  <li className="categories-item" key={brand.id}>
                    <input
                      className="categories-item__input"
                      type="checkbox"
                      checked={brand.checked}
                      onChange={(e) =>
                        handleBrandCheck(e.target.checked, brand.id)
                      }></input>
                    <label className="categories-item__label">
                      {brand.name}
                    </label>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CATEGORIES GIÁ */}
            <nav className="categories">
              <ul className="categories-list">
                <h3 className="categories__heading">Mức giá</h3>
                <div className="categories-list__price">
                  <div className="categories-range">
                    <input
                      type="text"
                      value={minPriceInput}
                      className="inputPrice"
                      onChange={(e) => setMinPriceInput(e.target.value)}
                    />
                    <span className="priceRange"></span>
                    <input
                      type="text"
                      value={maxPriceInput}
                      className="inputPrice"
                      onChange={(e) => setMaxPriceInput(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn--primary-main btn-filter"
                    onClick={() => handleMoneyRangeFilter()}>
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
                onClick={(e) => {
                  e.preventDefault();
                  setFilter("all");
                  fetchProductHome().then((res) => {
                    setFilteredProducts(res);
                  });
                  // Set all brands to unchecked
                  setBrands((prevBrands) =>
                    prevBrands.map((brand) => ({ ...brand, checked: false }))
                  );
                }}>
                Tất cả
              </button>
              <button
                className="btn home-filter__btn"
                onClick={(e) => {
                  e.preventDefault();
                  handlePopularFilter();
                }}>
                Bán chạy
              </button>
            </div>
            <div className="contant">
              {filteredProducts.map((curElmNew, index) => {
                const brand = brands.find((b) => b.id === curElmNew.brand_id);
                return brand && (brand.checked || filter === "all") ? (
                  <div className="box" key={index}>
                    <div className="img_box">
                      <img
                        src={`${url}${curElmNew.image}`}
                        alt={curElmNew.name}></img>
                      <div className="icon">
                        {auth.isAuth ? (
                          <li
                            onClick={() =>
                              addtocart(curElmNew.shop_product_id, 1)
                            }>
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
                      <h4 className="home-product-item__name">
                        {curElmNew.name}
                      </h4>
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
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
