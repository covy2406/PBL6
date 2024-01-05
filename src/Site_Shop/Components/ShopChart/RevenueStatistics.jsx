import { useState, useEffect } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
} from "recharts";
//api
import apiChart from "api/apiChart";
import "./ShopChart.css";

const RevenueStatistics = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiChart.revenueStatistics();
      setData(res.data);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <div className="shop__chart--title">Biểu đồ doanh thu theo ngày</div>
      <div className="shop__chart--form">
        <LineChart
          width={600}
          height={300}
          data={data.data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="order_date" />
          <YAxis dataKey="total_revenue" />
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
                    <p>Doanh thu: {payload[0].value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line type="monotone" dataKey="total_revenue" stroke="#8884d8" />
        </LineChart>
        <div className="shop__chart--data">
          Tổng doanh thu:{" "}
          {parseInt(
            data.data
              ? data.data.reduce(
                  (total, item) => total + Number(item.total_revenue),
                  0
                )
              : 0
          ).toLocaleString("vi-VN")}{" "}
          Đ
        </div>
      </div>
    </>
  );
};

export default RevenueStatistics;
