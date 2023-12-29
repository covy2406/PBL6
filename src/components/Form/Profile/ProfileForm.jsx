import { Link } from "react-router-dom";
import { days, months, years } from "./DateData.js";
import "../AccountForm.css";
import "./DatePicker.css";
import "./Profile.css";

import Avatar from "react-avatar-edit";

import React, { useEffect, useState } from "react";
import useAuth from "hook/useAuth.js";
import useProfile from "hook/useProfile.js";
import apiCustomerProfile from "api/apiCustomerProfile.js";
import { toast } from "react-toastify";
import { URLUtils } from "utils/urlUtils.js";

const ProfileForm = () => {
  //img states
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onClose = () => {
    toggleVisibility();
    setAvatar(preview);
    setPreview(preview);
  };
  const onCrop = (preview) => {
    setPreview(preview);
  };

  // get current date if user has not set birthday
  const currentDate = new Date();

  // get data from useProfile hook
  const { profile, auth } = useAuth();
  const { useprofile } = useProfile();

  // define states

  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();
  const [sex, setSex] = useState(1);
  const [birthday, setBirthday] = useState(
    [
      currentDate.getDate(),
      currentDate.getMonth() + 1,
      currentDate.getFullYear() - 18,
    ].map((value) => String(value))
  );
  const [dayy, setDays] = useState(birthday[0]);
  const [monthh, setMonths] = useState(birthday[1]);
  const [yearr, setYears] = useState(birthday[2]);

  useEffect(() => {
    useprofile();
  }, []);

  useEffect(() => {
    if (profile) {
      if (profile.dayOfBirth !== null) {
        const new_birthday = profile.dayOfBirth
          .split(" ")[0]
          .split("-")
          .reverse();
        setBirthday(new_birthday);
        //change from yyyy-mm-dd hh:mm:ss to dd-mm-yyyy
      }
      setEmail(profile.email);
      setPhone(profile.phone);
      setUser(profile.name);
      setSex(profile.sex === 1 ? "Nam" : "Nữ");
      setPreview(auth.url + profile.avatar);
    }
  }, [profile]);

  useEffect(() => {
    setDays(birthday[0]);
    setMonths(birthday[1]);
    setYears(birthday[2]);
  }, [birthday]);

  useEffect(() => {
    setBirthday([dayy, monthh, yearr]);
  }, [dayy, monthh, yearr]);

  const handleSubmit = (e) => {
    console.log(avatar);
    var avatarFile = URLUtils.base64ToFile(avatar, "avatar.png");
    const data = {
      name: user,
      email: email,
      avatar: avatarFile,
      phone: phone,
      sex: sex === "Nam" ? 1 : 0,
      //reverse birthday array to match api format yyyy-mm-dd
      dayOfBirth: birthday
        .reverse()
        .map((value) => (value < 10 ? `0${value}` : value))
        .join("-"),
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    apiCustomerProfile
      .updateProfile(data)
      .then((res) => {
        toast.success("Cập nhật thành công");
        window.sessionStorage.setItem("profile", JSON.stringify(data));
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        toast.error("Cập nhật thất bại");
        console.log("update profile err: ", err);
      });
  };

  return (
    <>
      <div className="profileform__title">
        <p className="profileform__title__item">Hồ sơ của tôi</p>
      </div>
      <div className="profileform__details">
        <div className="profileform__table">
          <table>
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
                {email}
                <Link className="profileform--link" to="/change-email">
                  Thay đổi
                </Link>
              </td>
            </tr>
            <tr className="profileform__table__row">
              <td className="profileform__table--left">Số điện thoại</td>
              <td className="profileform__table--right">
                {phone}
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
        {/* Change Avatar section */}
        <div className="profileform__avatar">
          <img src={preview} alt="" className="profileform__avatar--img" />
          <button
            className="profileform__avatar--button"
            onClick={() => {
              toggleVisibility();
            }}>
            Chọn ảnh
          </button>
        </div>
      </div>
      {isVisible ? (
        <div className="profileform__avatar--overlay">
          <div className="profileform__avatar--preview">
            <Avatar
              height={500}
              width={500}
              onCrop={onCrop}
              onClose={onClose}
              onImageLoad={(e) => {}}
              exportSize={300}
              label="Chọn ảnh"
              labelStyle={{
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              exportAsSquare={true}></Avatar>
            <button className="avatar__btn " onClick={onClose}>
              Lưu
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProfileForm;
