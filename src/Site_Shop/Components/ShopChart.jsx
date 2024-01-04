import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";
import { useState, useEffect } from "react";
import apiChart from "api/apiChart";

const ShopChart = () => {
  const [purchasePriceRangeStatistics, setPurchasePriceRangeStatistics] =
    useState([]);
  const [revenueStatistics, setRevenueStatistics] = useState([]);

  //data dữ liệu theo khoảng giá
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiChart.purchasePriceRangeStatistics();
      //convert to array
      setPurchasePriceRangeStatistics({ ...res.data, order_count: 2 });
    };
    fetchData();
  }, []);

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
        <div className="shop__chart">
          <LineChart
            width={730}
            height={250}
            data={purchasePriceRangeStatistics}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="shop__chart">
          <BarChart
            width={800}
            height={300}
            data={purchasePriceRangeStatistics.data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="range"
              tickFormatter={(value) => {
                const [start, end] = value.split("-");
                const startMillions = start / 1000000;
                const endMillions = end / 1000000;
                return `${startMillions}M - ${endMillions}M`;
              }}
            />
            <YAxis dataKey="order_count" />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  return (
                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: "0.5rem 1rem",
                        border: "1px solid #ccc",
                      }}>
                      <p>Số lượng: {payload[0].value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="order_count" fill="#8884d8" barSize={10} width={10} />
          </BarChart>
        </div>
      </div>
    </>
  );
};
export default ShopChart;
