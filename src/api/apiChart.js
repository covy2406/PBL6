import axiosClient from "./axiosClient";

const apiChart = {
  purchasePriceRangeStatistics() {
    return axiosClient.get("purchasePriceRangeStatistics/shops");
  },
};

export default apiChart;
