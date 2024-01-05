import axiosClient from "./axiosClient";

const apiChart = {
  purchasePriceRangeStatistics(startDate, endDate) {
    return axiosClient.get(
      `purchasePriceRangeStatistics/shops?startDate=${startDate}&endDate=${endDate}`
    );
  },
  revenueStatistics() {
    return axiosClient.get("revenueStatistics/shops");
  },
  AdminallShopRevenueStatistics(startDate, endDate) {
    return axiosClient.get(
      `allShopRevenueStatistics/shops?startDate=${startDate}&endDate=${endDate}`
    );
  },
};

export default apiChart;
