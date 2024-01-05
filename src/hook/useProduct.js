import apiProduct from "api/apiProduct";

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
  return {
    getAllProducts,
  };
};

export default useProduct;
