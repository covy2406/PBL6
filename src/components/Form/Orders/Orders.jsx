import { useState, useEffect } from "react";
import OrdersCard from "./OrdersCard";
import useProfile from "hook/useProfile";

const Orders = () => {
  const { getprofileorders } = useProfile();
  //test data
  const [orderList, setOrderList] = useState();

  useEffect(() => {
    getprofileorders().then((res) => {
      setOrderList(res.data);
    });
    console.log("order list: ", orderList);
  }, []);

  return (
    <>
      <div className="profileform">
        <div className="profileform__title">
          <p className="profileform__title__item">Đơn mua</p>
        </div>
        <div className="profileform__details">
          <div className="profileorder--list">
            {orderList?.map((order) => (
              <OrdersCard data={order} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
