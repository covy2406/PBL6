import apiShop from "api/apiShop";
import { useNavigate } from "react-router-dom";

const useShop = () => {
  const navigate = useNavigate();
  const getShopdetails = async () => {
    try {
      const response = await apiShop.getinfo();
      console.log("useShop response: ", response.data);
      return response.data;
    } catch (err) {
      console.log("useProfile err: " + err);
      return false;
    }
  };
  return { getShopdetails };
};

export default useShop;
