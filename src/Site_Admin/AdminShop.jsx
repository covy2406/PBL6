import useAdmin from "hook/useAdmin";
import "./css/Admin.css";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

function AdminShop() {
  const { getAllShop } = useAdmin();
  const [shopList, setShopList] = useState([]);
  useEffect(() => {
    getAllShop().then((res) => {
      console.log(res.data);
      setShopList(res.data);
    });
  }, []);

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

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
            <PieChart width={300} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminShop;
