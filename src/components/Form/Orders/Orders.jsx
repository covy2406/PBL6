import { useState, useEffect } from "react";
import OrdersCard from "./OrdersCard";
import useProfile from "hook/useProfile";
import Select from "react-select";
import { getStatusFromEn } from "datas/statusData";

const Orders = () => {
  const { getprofileorders } = useProfile();
  //test data
  const [orderList, setOrderList] = useState();
  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState();

  useEffect(() => {
    getprofileorders().then((res) => {
      setOrderList(res.data);
      const statuses = [...new Set(res.data.map((order) => order.status))];
      setType(statuses);
    });
  }, []);

  return (
    <>
      <div className="profileform">
        <div className="profileform__title">
          <p className="profileform__title__item">Đơn mua</p>
          <Select
            className="profileform__title__select"
            placeholder="Lọc tình trạng đơn hàng"
            onChange={(selectedOption) => {
              setSelectedType(selectedOption.value);
            }}
            styles={{
              valueContainer: (base) => ({
                ...base,
                fontSize: "1.4rem",
                fontWeight: "400",
                color: "#9e9e9e",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#9e9e9e",
                fontSize: "1.4rem",
                fontWeight: "400",
              }),
              control: (base) => ({
                ...base,
                width: "23rem",
                border: "1px solid #d9d9d9",
                borderRadius: "1px",
                paddingLeft: "1rem",
                maxHeight: "5rem",
              }),
              menu: (base) => ({
                ...base,
                fontSize: "1.4rem",
                backgroundColor: "#f0f0f0",
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                paddingLeft: "1rem",
              }),
            }}
            options={type.map((status) => ({
              value: status,
              label: getStatusFromEn(status),
            }))}
          />
        </div>
        <div className="profileform__details">
          <div className="profileorder--list">
            {orderList?.map((order) => (
              <OrdersCard data={order} type={selectedType} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
