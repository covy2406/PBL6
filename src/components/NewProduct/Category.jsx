import React from "react";
import { useState, useEffect } from "react";
import "./product.css";
import useFilterHandle from "hook/useFilterHandle";

const Category = ({ ProductNew, setProductNew }) => {
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const { fetchBrands } = useFilterHandle();

  useEffect(() => {
    fetchBrands();
  }, []);

  // Cập nhật sản phẩm được lọc khi danh sách thương hiệu được thay đổi
  useEffect(() => {
    const getProductsBySelectedBrands = () => {
      const filteredProducts = ProductNew.filter((product) =>
        selectedBrands.includes(product.brandId)
      );
      setFilteredProducts(filteredProducts);
    };

    getProductsBySelectedBrands();
  }, [selectedBrands, ProductNew]);

  // Xử lý sự kiện khi checkbox thương hiệu thay đổi
  const handleBrandCheckboxChange = (brand) => {
    if (selectedBrands.includes(brand.id)) {
      setSelectedBrands(selectedBrands.filter((id) => id !== brand.id));
    } else {
      setSelectedBrands([...selectedBrands, brand.id]);
    }
  };

  return (
    <div className="grid__column-2">
      {/* CATEGORY CHO TÊN BRAND */}

      <nav className="categories">
        <ul className="categories-list">
          <h3 className="categories__heading">Thương hiệu</h3>
          {brands.map((brand) => (
            <li className="categories-item" key={brand.id}>
              <input className="categories-item__input" type="checkbox">
                checked={selectedBrands.includes(brand.id)}
                onChange={() => handleBrandCheckboxChange(brand.id)}
              </input>
              <label className="categories-item__label" htmlFor="all">
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
          <li className="categories-item">
            <input className="categories-item__input" type="checkbox" />
            <label className="categories-item__label" htmlFor="all">
              Tất cả
            </label>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Category;
