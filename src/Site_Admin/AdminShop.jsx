import useAdmin from "hook/useAdmin";
import "./css/Admin.css";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import apiChart from "api/apiChart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function AdminShop() {
  const { getAllShop } = useAdmin();
  const [shopList, setShopList] = useState([]);
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  // Add state for the start and end dates
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  // Update the useEffect hook to use the state variables
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiChart.AdminallShopRevenueStatistics(
        startDate,
        endDate
      );
      const resData = res.data.map((item) => ({
        shopName: item.shopName,
        total_revenue: parseInt(item.total_revenue),
      }));
      console.log(resData);
      setTotalRevenue(
        res.data.reduce((a, b) => a + parseInt(b.total_revenue), 0)
      );
      const sortedData = [
        ...resData,
        {
          shopName: "Hoa hồng",
          total_revenue: totalRevenue * 0.05,
        },
      ].sort((a, b) => {
        if (a.shopName === "Hoa hồng") return -1;
        if (b.shopName === "Hoa hồng") return 1;
        return a.total_revenue - b.total_revenue;
      });
      setData(sortedData);
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    console.log(startDate, endDate);
    apiChart.AdminallShopRevenueStatistics(startDate, endDate).then((res) => {
      setData([
        ...res.data,
        {
          shopName: "Hoa hồng",
          total_revenue: totalRevenue * 0.05,
        },
      ]);
    });
  };
  useEffect(() => {
    getAllShop().then((res) => {
      console.log(res.data);
      setShopList(res.data);
    });
  }, []);

  return (
    <>
      <div className="grid">
        <div className="admin__top--title">Danh sách cửa hàng</div>
        <div className="admin__body">
          <div className="admin__body--list">
            {Object.keys(shopList).map((key) => {
              return (
                <div className="admin__body--list-item">
                  <div className="admin--item--title">
                    Tên cửa hàng: {shopList[key].shopName}
                  </div>
                  <div className="admin--item--title">
                    Địa chỉ: {shopList[key].shopAddress}
                  </div>
                  <div className="admin--item--title">
                    Số điện thoại: {shopList[key].shopPhone}
                  </div>
                  <div className="admin--item--title">
                    Trạng thái:{" "}
                    {shopList[key].state ? "Đang hoạt động" : "Ngừng hoạt động"}
                  </div>
                  <div className="admin--item--title">
                    Tài khoảng ngân hàng: {shopList[key].bankAccount}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="admin__body--chart">
            <PieChart width={500} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="total_revenue"
                label={({ total_revenue }) =>
                  `${(total_revenue / 1000000).toFixed(1)}M`
                }>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
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
                        <p className="tooltips--item">
                          Cửa hàng: {payload[0].payload.shopName}
                        </p>
                        <p className="tooltips--item">
                          Doanh thu:{" "}
                          {(parseInt(payload[0].value) / 1000000).toFixed(1)}M
                          VNĐ
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
            <div>
              {" "}
              <input
                className="admin__body--chart--input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                className="admin__body--chart--input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <button
                className="admin__body--chart--button"
                onClick={handleSubmit}>
                Xem
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminShop;
