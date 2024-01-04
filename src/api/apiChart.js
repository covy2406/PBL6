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
    startDate = "2023-01-01";
    endDate = "2024-12-31";
    return axiosClient.get(
      `AdminallShopRevenueStatistics?startDate=${startDate}&endDate=${endDate}`
    );
  },
};

export default apiChart;
