import { toast } from "react-toastify";
import useFilter from "./useFilter";
import apiHandlePrice from "api/apiHandlePrice";
import apiHandleBrand from "api/apiHandleBrand";
//import { useEffect } from "react";

const useFilterHandle = () => {
    const { minPriceInput,
            maxPriceInput,
            setBrands,
            setSelectedBrandId,
            setSelectedBrands,
            setFilteredProducts,
            selectedBrandProducts,
        } = useFilter();


    // call api Brand
    const fetchBrands = async () => {
        try {
            const response = await apiHandleBrand.getAllBrand();
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };
    // useEffect(() => {

    //     fetchBrands();
    // }, []);

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
        toast.success('Hiển thị tất cả các sản phẩm')
    };

    // Ham call api gia:
    // Sử dụng hàm fetchPrice khi minPriceInput hoặc maxPriceInput thay đổi
    const fetchPrice = async () => {
        try {
            const response = await apiHandlePrice.getPrice(minPriceInput, maxPriceInput);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products by price:', error);
        }
    };
    // useEffect(() => {

    //     fetchPrice();
    // }, [minPriceInput, maxPriceInput, setFilteredProducts]);

    // // hàm xử lý áp dụng lọc giá
    // const handleApplyFilter = () => {
    //     const minPriceValue = parseFloat(minPriceInput);
    //     const maxPriceValue = parseFloat(maxPriceInput);

    //     if (!isNaN(minPriceValue) && !isNaN(maxPriceValue) && minPriceValue <= maxPriceValue) {
    //         // Lọc sản phẩm theo khoảng giá nhập vào
    //         const filtered = selectedBrandProducts.filter(
    //             (product) =>
    //                 parseFloat(product.price) >= minPriceValue &&
    //                 parseFloat(product.price) <= maxPriceValue
    //         );
    //         setFilteredProducts(filtered);
    //     } else {
    //         // Hiển thị thông báo lỗi nếu giá nhập vào không hợp lệ
    //         toast.error('Vui lòng nhập giá hợp lệ.', { autoClose: 1000 });
    //     }
    // };

    // Xử lý áp dụng bộ lọc giá
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

    

    return {
        fetchBrands,
        fetchPrice,
        handleBrandCheckboxChange,
        handleShowAllProducts,
        handleApplyFilter,
    }
}
export default useFilterHandle;