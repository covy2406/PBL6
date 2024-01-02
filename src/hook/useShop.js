import apiShop from "api/apiShop";
import apiShopProduct from "api/apiShopProduct";
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
      return response.data.data;
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
      return response.data.data;
    } catch (err) {
      console.log("useShop getShopProductsAll err: " + err);
      return false;
    }
  };
  const getShopProductsAll = async () => {
    try {
      const response = await apiShop.getallproducts();
      window.sessionStorage.setItem(
        "shopProducts",
        JSON.stringify(response.data.data)
      );
      return response.data.data;
    } catch (err) {
      console.log("useShop getShopProductsAll err: " + err);
      return false;
    }
  };
  const updateShopProduct = async (data, id) => {
    try {
      const response = await apiShopProduct.update(data, id);
      if (response?.message === "Resource updated successfully") {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const deleteShopProduct = async (id) => {
    try {
      const response = await apiShopProduct.remove(id);
      console.log(response);
      console.log("useShop deleteShopProduct id: ", id);
    } catch (err) {
      return false;
    }
  };
  const createShopProduct = async (data) => {
    try {
      const response = await apiShopProduct.add(data);
      return response;
    } catch (err) {
      return false;
    }
  };
  const getShopPromosAll = async (id) => {
    try {
      const response = await apiShop.getallpromos(id);
      window.sessionStorage.setItem(
        "shopPromos",
        JSON.stringify(response.data)
      );
      return response.data;
    } catch (err) {
      console.log("useShop getShopPromosAll err: " + err);
      return false;
    }
  };
  const createShopPromo = async (data) => {
    try {
      const response = await apiShop.addpromos(data);
      return response;
    } catch (err) {
      return false;
    }
  };
  const updateShopPromo = async (data, id) => {
    try {
      const response = await apiShop.updatepromos(data, id);
      if (response?.message === "Resource updated successfully") {
        window.sessionStorage.setItem("shopPromos", JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const deleteShopPromo = async (id) => {
    try {
      const response = await apiShop.delpromos(id);
      return response;
    } catch (err) {
      return false;
    }
  };
  return {
    getShopdetails,
    updateShopdetails,
    getShopOrdersAll,
    getShopProductsAll,
    updateShopProduct,
    deleteShopProduct,
    createShopProduct,
    getShopPromosAll,
    createShopPromo,
    updateShopPromo,
    deleteShopPromo,
  };
};

export default useShop;
