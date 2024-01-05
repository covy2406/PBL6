import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
//api
import apiChart from "api/apiChart";

const PurchasePriceRangeStatistics = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiChart.purchasePriceRangeStatistics();
      setData({
        ...res.data,
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      });
    };
    fetchData();
  }, []);
  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiChart.purchasePriceRangeStatistics(
      data.startDate,
      data.endDate
    );
    setData({
      ...data,
      data: res.data.data,
    });
  };

  return (
    <>
      <div className="shop__chart--title">
        Biểu đồ lượng mua theo khoảng giá
      </div>
      <div className="shop__chart--form">
        <BarChart
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
          <Bar dataKey="order_count" fill="#000000" barSize={10} width={10} />
        </BarChart>
        <div className="shop__chart--data">
          <div>Bắt đầu</div>
          <input
            className=""
            type="date"
            name="startDate"
            value={data.startDate}
            onChange={(e) =>
              setData({
                ...data,
                startDate: e.target.value,
              })
            }
          />
          <div>Kết thúc</div>
          <input
            className=""
            type="date"
            name="startDate"
            value={data.endDate}
            onChange={(e) =>
              setData({
                ...data,
                endDate: e.target.value,
              })
            }
          />
          <button
            className="productscard__container-update--body-item--btn"
            onClick={(e) => handleSubmit(e)}>
            Xem
          </button>
        </div>
      </div>
    </>
  );
};

export default PurchasePriceRangeStatistics;
