import apiAdmin from "api/apiAdmin";

const useAdmin = () => {
  const getAllShopProduct = async () => {
    try {
      const response = await apiAdmin.getAllShopProduct();
      return response;
    } catch (err) {
      console.log("useAdmin err: " + err);
      return false;
    }
  };
  const getAllAccount = async () => {
    try {
      const response = await apiAdmin.getAllAccount();
      return response;
    } catch (err) {
      console.log("useAdmin err: " + err);
      return false;
    }
  };
  const getAllShop = async () => {
    try {
      const response = await apiAdmin.getAllShop();
      return response;
    } catch (err) {
      console.log("useAdmin err: " + err);
      return false;
    }
  };
  return {
    getAllShopProduct,
    getAllAccount,
    getAllShop,
  };
};

export default useAdmin;
