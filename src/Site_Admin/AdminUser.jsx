import useAdmin from "hook/useAdmin";
import { useEffect, useState } from "react";

function AdminUser() {
  const { getAllAccount } = useAdmin();
  const [accountList, setAccountList] = useState([]);
  useEffect(() => {
    getAllAccount().then((res) => {
      setAccountList(res.data);
    });
  }, []);

  return (
    <>
      <div className="grid">
        <div className="admin__top--title">Danh sách tài khoản người dùng</div>
        <div className="admin__body--list">
          {Object.keys(accountList).map((key) => {
            return (
              <div className="admin__body--list-item">
                <div className="admin--item--title">
                  Tên người dùng: {accountList[key].name}
                </div>
                <div className="admin--item--title">
                  Email: {accountList[key].email}
                </div>
                <div className="admin--item--title">
                  Số điện thoại: {accountList[key].phone}
                </div>
                <div className="admin--item--title">
                  Địa chỉ: {accountList[key].address}
                </div>
                <div className="admin--item--title">
                  Giới tính: {accountList[key].sex ? "Nam" : "Nữ"}
                </div>
                <div className="admin--item--title">
                  Ngày sinh:{" "}
                  {accountList[key].dayOfBirth
                    ?.split(" ")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default AdminUser;
