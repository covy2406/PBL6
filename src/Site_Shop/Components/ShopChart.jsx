import PurchasePriceRangeStatistics from "./ShopChart/PurchasePriceRangeStatistics";
import RevenueStatistics from "./ShopChart/RevenueStatistics";

const ShopChart = () => {
  return (
    <>
      <div className="shop__container-nav">
        <div className="shop__menu_container">
          <div className="shop__home">
            <ul className="shop__home-list">
              <li className="shop__home-item">Phân tích bán hàng</li>
            </ul>
          </div>
        </div>
        <div className="shop__chart--list">
          <div className="shop__chart">
            <RevenueStatistics />
          </div>
          <div className="shop__chart">
            <PurchasePriceRangeStatistics />
          </div>
        </div>
      </div>
    </>
  );
};
export default ShopChart;
