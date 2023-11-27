import React from "react";
import icon from "../../Icon";
import { NavLink } from "react-router-dom";

function SignupForm() {
  return (
    <form className="authform">
      <div className="authform--name">
        <NavLink to="/login" className="icon__arrowback">
          <icon.IoArrowBack />
        </NavLink>
        <h1>ĐẶT LẠI MẬT KHẨU</h1>
      </div>
      <div className="authform--details">
        <label>Số điện thoại </label>
      </div>
      <div className="authform--input">
        <input type="text" className="input" placeholder="Số điện thoại" />
      </div>
      <button className="button-submit">Tiếp theo</button>
    </form>
  );
}

export default SignupForm;
