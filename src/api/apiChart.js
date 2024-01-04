import axiosClient from "./axiosClient";

const apiChart = {
  purchasePriceRangeStatistics() {
    return axiosClient.get("purchasePriceRangeStatistics/shops");
  },
  revenueStatistics() {
    return axiosClient.get("revenueStatistics/shops");
  },
  AdminallShopRevenueStatistics(startDate, endDate) {
    startDate = "2023-01-01";
    endDate = "2024-12-31";
    return axiosClient.get(
      `AdminallShopRevenueStatistics?startDate=${startDate}&endDate=${endDate}`
    );
  },
};

export default apiChart;
