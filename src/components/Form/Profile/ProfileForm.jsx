import { Link } from "react-router-dom";
import { days, months, years } from "./DateData.js";
import "../AccountForm.css";
import "./DatePicker.css";
import "./Profile.css";

import React, { useEffect, useState } from "react";
//import api for customer profile
import apiCustomerProfile from "api/apiCustomerProfile.js";
//import useAuth hook
import useAuth from "Hook/useAuth.js";

const ProfileForm = () => {
  const { auth } = useAuth();
  const [User, setUserDTB] = useState({});
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const response = await apiCustomerProfile.getProfile({
          token: auth.access_token,
        });
        setUserDTB(response.data);
      };
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  });
  // Masked email and phone number
  const maskedEmail =
    User.email.substring(0, 3) +
    "*".repeat(User.email.length - 12) +
    "@gmail.com";
  const maskedPhone = "*".repeat(8) + User.phone.substring(8, 10);
  //user
  const [user, setUser] = useState(User.name);
  const [sex, setSex] = useState(User.sex);

  const birthday = User.dateOfBirth.split("/");

  const [dayy, setDays] = useState(birthday[0]);
  const [monthh, setMonths] = useState(birthday[1]);
  const [yearr, setYears] = useState(birthday[2]);

  return (
    <div className="profileform">
      <div className="profileform__title">
        <p className="profileform__title__item">Hồ sơ của tôi</p>
      </div>
      <div className="profileform__details">
        <div className="profileform__table">
          <table>
            <tr className="profileform__table__row">
              <td className="profileform__table--left">Tên đăng nhập</td>
              <td className="profileform__table--right">admin</td>
            </tr>
            <tr className="profileform__table__row">
              <td className="profileform__table--left">Họ và tên</td>
              <td className="profileform__table--right">
                <input
                  className="profileform--nameinput"
                  type="text"
                  placeholder="Họ và tên"
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}></input>
              </td>
            </tr>
            <tr className="profileform__table__row ">
              <td className="profileform__table--left">Email</td>
              <td className="profileform__table--right">
                {maskedEmail}
                <Link className="profileform--link" to="/change-email">
                  Thay đổi
                </Link>
              </td>
            </tr>
            <tr className="profileform__table__row">
              <td className="profileform__table--left">Số điện thoại</td>
              <td className="profileform__table--right">
                {maskedPhone}
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
                  checked={sex === "Nam"}
                  onChange={(e) => {
                    setSex("Nam");
                  }}
                />
                <div class="circle"></div>
                <label for="option1">Nam</label>
                <input
                  type="radio"
                  name="choice"
                  id="femaleRadio"
                  value="Option 2"
                  checked={sex === "Nữ"}
                  onChange={(e) => {
                    setSex("Nữ");
                  }}
                />
                <div class="circle"></div>
                <label for="option2">Nữ</label>
                <input
                  type="radio"
                  name="choice"
                  id="otherRadio"
                  value="Option 3"
                  checked={sex === "Khác"}
                  onChange={(e) => {
                    setSex("Khác");
                  }}
                />
                <div class="circle"></div>
                <label for="option3">Khác</label>
              </td>
            </tr>
            <tr className="profileform__table__row">
              <td className="profileform__table--left">Ngày sinh</td>
              <td className="profileform__table--right">
                <select
                  id="day"
                  name="day"
                  className="profileform--datepicker"
                  value={dayy}
                  onChange={(e) => setDays(e.target.value)}>
                  {days.map((day, index) => (
                    <option key={index} value={index + 1}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  id="month"
                  name="month"
                  className="profileform--datepicker"
                  value={monthh}
                  onChange={(e) => setMonths(e.target.value)}>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  id="year"
                  name="year"
                  className="profileform--datepicker"
                  value={yearr}
                  onChange={(e) => setYears(e.target.value)}>
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr className="profileform__table__row">
              <td></td>
              <td className="profileform__table--right">
                <button className="profileform__button">Lưu</button>
              </td>
            </tr>
          </table>
        </div>
        <div className="profileform__avatar">
          <img
            src="https://cf.shopee.vn/file/4f3c7e7e0d2d9d9c2b1f3d7f6a3d0c5c_tn"
            alt="avatar"
          />
          <button className="profileform__avatar--button">Chọn ảnh</button>
          <p>Thay đổi ảnh đại diện</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
