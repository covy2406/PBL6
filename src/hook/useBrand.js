import apiBrand from "api/apiBrand";

const useBrand = () => {
  const getAllBrands = async () => {
    try {
      const response = await apiBrand.getAllBrand();
      const newData = response.data.map((item) => {
        return { ...item, checked: false };
      });
      return newData;
    } catch (err) {
      return false;
    }
  };
  return {
    getAllBrands,
  };
};

export default useBrand;
