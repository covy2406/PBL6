import React, { createContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchProduct, setSearchProduct] = useState([]);

    //Brand:
    const [brands, setBrands] = useState([]); //brands: Lưu trữ danh sách các thương hiệu sản phẩm.
    const [selectedBrands, setSelectedBrands] = useState([]); // cac brand duoc chon(tich vao checkbox)
    // và Lưu trữ danh sách thương hiệu được chọn từ checkbox.

    const [selectedBrandId, setSelectedBrandId] = useState(null); // Lưu trữ ID của thương hiệu đang được chọn.
    const [selectedBrandProducts, setSelectedBrandProducts] = useState([]);// selectedBrandProducts: Lưu trữ danh sách sản phẩm của thương hiệu được 

    const [filteredProducts, setFilteredProducts] = useState([]); //filteredProducts: Lưu trữ danh sách sản phẩm được lọc dựa trên các điều kiện nhất định.

    const [price, setPrice] = useState([]);

    // Giá
    const [minPriceInput, setMinPriceInput] = useState('');
    const [maxPriceInput, setMaxPriceInput] = useState('');

    const FilterContextData = {
        //search
        searchTerm,
        setSearchTerm,
        searchProduct,
        setSearchProduct,

        //brand
        brands,
        setBrands,
        selectedBrands,
        setSelectedBrands,
        selectedBrandId,
        setSelectedBrandId,
        filteredProducts,
        setFilteredProducts,
        selectedBrandProducts,
        setSelectedBrandProducts,

        //price
        price,
        setPrice,

        //filter
        minPriceInput,
        maxPriceInput,
        setMaxPriceInput,
        setMinPriceInput
    }

    return (
        <FilterContext.Provider value={FilterContextData}>
            {children}
        </FilterContext.Provider>
    );
}
export default FilterProvider;