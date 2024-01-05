import axiosClient from "./axiosClient.js";

const apiBrand = {
  getAllBrand() {
    return axiosClient.get("brands");
  },
};

export default apiBrand;
