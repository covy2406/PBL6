import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const data = [
  //doanh thu token
  {
    date: "2021-01-01",
    revenue: "4 000 000",
  },
  {
    date: "2021-02-01",
    revenue: "4 000 000",
  },
  {
    date: "2021-03-01",
    revenue: "4 000 000",
  },
  {
    date: "2021-04-01",
    revenue: "4 000 000",
  },
  //Khoảng giá mua nhiều (ngày bắt đầu, ngày kết thúc)
  {
    range: 0,
    quantity: "4",
  },
  {
    range: 1,
    quantity: "4",
  },
  {
    range: "3 000 000 - 4 000 000",
    quantity: "4",
  },
  {
    range: "4 000 000 - 5 000 000",
    quantity: "4",
  },
];

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
        <div className="shop__chart">
          <LineChart
            width={730}
            height={250}
            data={data}
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
      </div>
    </>
  );
};
export default ShopChart;
