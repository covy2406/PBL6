import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/ShopSignup.css";

import useAuth from "hook/useAuth";

const ShopSignup = () => {
  const { profile, setProfile } = useAuth();
  //define states
  const [shopName, setShopName] = useState(profile.name);
  const [shopAddress, setShopAddress] = useState();
  const [shopPhone, setShopPhone] = useState();
  const [shopEmail, setShopEmail] = useState();

  const handleSubmit = (e) => {};
  return (
    <div className="grid">
      <div className="Onboard__progress">
        <div className="Onboard__progress-bar">Step 1</div>
        <div className="Onboard__progress-bar">Step 2</div>
        <div className="Onboard__progress-bar">Step 3</div>
      </div>
      <div className="Onboard__form">
        <table>
          <tr className="profileform__table__row">
            <td className="profileform__table--left">Tên shop</td>
            <td className="profileform__table--right">
              <input
                className="profileform--nameinput"
                type="text"
                placeholder="Tên shop"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}></input>
            </td>
          </tr>
          <tr className="profileform__table__row ">
            <td className="profileform__table--left">Email</td>
            <td className="profileform__table--right">{}</td>
          </tr>
          <tr className="profileform__table__row">
            <td className="profileform__table--left">Số điện thoại</td>
            <td className="profileform__table--right">
              <Link className="profileform--link" to="/change-phone">
                Thay đổi
              </Link>
            </td>
          </tr>
          <tr className="profileform__table__row">
            <td className="profileform__table--left">Giới tính</td>
            <td className="profileform__table--right radio-input">
              <input
                type="radio"
                name="choice"
                id="maleRadio"
                value="Option 1"
              />
              <div class="circle"></div>
              <label for="option1">Nam</label>
              <input
                type="radio"
                name="choice"
                id="femaleRadio"
                value="Option 2"
              />
              <div class="circle"></div>
              <label for="option2">Nữ</label>
            </td>
          </tr>
          <tr className="profileform__table__row">
            <td className="profileform__table--left">Ngày sinh</td>
            <td className="profileform__table--right"></td>
          </tr>
          <tr className="profileform__table__row">
            <td className="noborder"></td>
            <td className="profileform__table--right noborder">
              <button
                className="profileform__button"
                onClick={(e) => handleSubmit(e)}>
                Lưu
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ShopSignup;
