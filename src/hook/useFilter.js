import { useContext } from "react";
import FilterContext from "../context/FilterContext"

// Tạo một custom hook để sử dụng context
const useFilter = () => {
  //Filter là biến mà hàm trả về, nó chứa giá trị của Context (FilterContext).
  const Filter = useContext(FilterContext);
  console.log('in ra useFilter', useFilter);
  return Filter;
};

export default useFilter;
