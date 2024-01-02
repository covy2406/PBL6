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
              <div>
                <div>{accountList[key].name}</div>
                <div>{accountList[key].email}</div>
                <div>{accountList[key].phone}</div>
                <div>{accountList[key].address}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default AdminUser;
