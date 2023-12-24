import apiShop from "api/apiShop";
import useAuth from "./useAuth";

const useShop = () => {
  const { setShopProfile } = useAuth();
  const getShopdetails = async () => {
    try {
      const response = await apiShop.getinfo();
      window.sessionStorage.setItem(
        "shopProfile",
        JSON.stringify(response.data.data)
      );
      setShopProfile(JSON.parse(window.sessionStorage.getItem("shopProfile")));
      return true;
    } catch (err) {
      console.log("useProfile err: " + err);
      return false;
    }
  };
  const updateShopdetails = async (data, id) => {
    try {
      const response = await apiShop.updateinfo(data, id);
      console.log(response);
      console.log("useShop updateShopdetails data: ", data);
      if (response?.message === "Resource updated successfully") {
        window.sessionStorage.setItem("shopProfile", JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const getShopOrdersAll = async () => {
    try {
      const response = await apiShop.getallorders();
      window.sessionStorage.setItem(
        "shopOrders",
        JSON.stringify(response.data.data)
      );
      return true;
    } catch (err) {
      console.log("useShop getShopProductsAll err: " + err);
      return false;
    }
  };
  return { getShopdetails, updateShopdetails, getShopOrdersAll };
};

export default useShop;
