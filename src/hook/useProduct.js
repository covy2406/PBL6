import apiProduct from "api/apiProduct";
import apiProductHome from "api/apiProductHome";

const useProduct = () => {
  const getAllProducts = async () => {
    try {
      const response = await apiProduct.getAll();
      return response.data;
    } catch (err) {
      console.log("useProfile err: " + err);
      return false;
    }
  };

  // const fetchProductHome = async () => {
  //   try {
  //     const response = await apiProductHome.getAll();
  //     return response.data;
  //   } catch (error) {
  //     console.log('lỗi không thể call api', error);
  //   }
  // };
  return {
    getAllProducts,
    //fetchProductHome
  };
};

export default useProduct;
