import React, { createContext, useState } from "react";

const SearchAndBrandContext = createContext();

export const SearchAndBrandProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchProduct, setSearchProduct] = useState([]);

    //Brand:
    const [brands, setBrands] = useState([]); //brands: Lưu trữ danh sách các thương hiệu sản phẩm.
    const [selectedBrands, setSelectedBrands] = useState([]); // cac brand duoc chon(tich vao checkbox)
    // và Lưu trữ danh sách thương hiệu được chọn từ checkbox.

    const [selectedBrandId, setSelectedBrandId] = useState(null); // Lưu trữ ID của thương hiệu đang được chọn.
    const [selectedBrandProducts, setSelectedBrandProducts] = useState([]);// selectedBrandProducts: Lưu trữ danh sách sản phẩm của thương hiệu được 

    const [filteredProducts, setFilteredProducts] = useState([]); //filteredProducts: Lưu trữ danh sách sản phẩm được lọc dựa trên các điều kiện nhất định.

    const searchAndBrandContextData = {
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
    }

    return (
        <SearchAndBrandContext.Provider value={searchAndBrandContextData}>
            {children}
        </SearchAndBrandContext.Provider>
    );
}
export default SearchAndBrandProvider;