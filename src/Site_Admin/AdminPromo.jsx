import useAdmin from "hook/useAdmin";
import "./css/Admin.css";
import { useEffect, useState } from "react";
import e from "cors";

function AdminPromo() {
  const { getAllPromos } = useAdmin();
  const [promoList, setPromoList] = useState({});

  useEffect(() => {
    getAllPromos().then((res) => {
      setPromoList(res);
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      code: "4B1G",
      type: 0,
      value: 100000,
      quantity: 100,
      minPriceCondition: 0,
      state: 1,
      startDate: "2021-05-01",
      endDate: "2021-05-31",
      bankAccount: "123456789",
    };
  };

  return (
    <>
      <div className="grid">
        <div className="admin__top--title">Danh sách cửa hàng</div>
        <div className="admin__body">
          <div className="admin__body--list">
            {Object.keys(promoList).map((key) => {
              return (
                <div className="admin__body--list-item">
                  <div className="admin--item--title">
                    Mã khuyến mãi: {promoList[key].code}
                  </div>
                  <div className="admin--item--title">
                    Giá trị:{" "}
                    {promoList[key].type
                      ? promoList[key].value + "%"
                      : parseInt(promoList[key].value).toLocaleString + "VNĐ"}
                  </div>
                  <div className="admin--item--title">
                    Số lượng: {promoList[key].quantity}
                  </div>
                  <div className="admin--item--title">
                    Điều kiện: {promoList[key].minPriceCondition}
                  </div>
                  <div className="admin--item--title">
                    Trạng thái:{" "}
                    {promoList[key].state
                      ? "Đang hoạt động"
                      : "Ngừng hoạt động"}
                  </div>
                  <div className="admin--item--title">
                    Từ: {promoList[key].startDate} đến: {promoList[key].endDate}
                  </div>
                  <div className="admin--item--title">
                    Tài khoảng ngân hàng: {promoList[key].bankAccount}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="admin__body--chart--button"
            onClick={(e) => handleSubmit(e)}>
            Thêm mã khuyến mãi của 4B1G
          </button>
        </div>
      </div>
    </>
  );
}
export default AdminPromo;
