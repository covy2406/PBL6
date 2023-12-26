import { useContext } from "react";
import SearchAndBrandContext from "../context/SearchAndBrandContext"

// Tạo một custom hook để sử dụng context
const useSearchandBrand = () => {
  const searchAndBrand = useContext(SearchAndBrandContext);
  return searchAndBrand;;
};

export default useSearchandBrand;
