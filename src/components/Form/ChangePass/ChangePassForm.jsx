import React, { useState } from "react";
import "../AccountForm.css";
import "./ChangePass.css";
import useProfile from "hook/useProfile";
import { toast } from "react-toastify";

function ChangePassform() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const useprofile = useProfile();

  const handdleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      current_password: password,
      new_password: newPassword,
      confirm_password: reNewPassword,
    };
    const res = await useprofile.updatepassword(data);
    if (res) {
      toast.success("Đổi mật khẩu thành công");
      setPassword("");
      setNewPassword("");
      setReNewPassword("");
    } else {
      toast.error("Đổi mật khẩu thất bại");
    }
  };

  return (
    <div className="profileform">
      <div className="profileform__title">
        <div className="profileform__title__item">Đổi mật khẩu</div>
      </div>
      <div className="profileform__details">
        <div className="passform__table">
          <table>
            <tr className="passform__table__row">
              <td className="passform__table--left">Mật khẩu cũ</td>
              <td className="passform__table--right">
                <input
                  className="passform--passinput"
                  type="password"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}></input>
              </td>
            </tr>
            <tr className="passform__table__row">
              <td className="passform__table--left">Mật khẩu mới</td>
              <td className="passform__table--right">
                <input
                  className="passform--passinput"
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}></input>
              </td>
            </tr>
            <tr className="passform__table__row">
              <td className="passform__table--left">Xác nhận mật khẩu mới</td>
              <td className="passform__table--right">
                <input
                  className="passform--passinput"
                  type="password"
                  value={reNewPassword}
                  onChange={(e) => {
                    setReNewPassword(e.target.value);
                  }}></input>
              </td>
            </tr>
          </table>
          <button
            className="passform__button"
            onClick={(e) => handdleSubmit(e)}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
export default ChangePassform;
