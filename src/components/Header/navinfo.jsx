import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { BiLogoInstagramAlt } from "react-icons/bi";

const Navinfo = () => {
  return (
    <div>
      <ul className="header__navbar-list">
        <li className="header__navbar-item header__navbar-item--separate">
          <Link to="/shop" className="header__navbar-item-link">
            Kênh người bán
          </Link>
        </li>
        <li className="header__navbar-item header__navbar-item--has-qr header__navbar-item--separate">
          Vào cửa hàng trên ứng dụng shop
          {/* QR CODE */}
          <div className="header__qr">
            <img
              src="./img/qrcode.png"
              alt="QRcode"
              className="header__qr-img"></img>
            <div class="header__qr-apps">
              <div className="header__qr-link">
                <img
                  src="./img/google_play_logo.png"
                  alt="google play"
                  className="header__qr-dowload-img"></img>
              </div>
              <div className="header__qr-link">
                <img
                  src="./img/apple_logo.png"
                  alt="app store"
                  className="header__qr-dowload-img"></img>
              </div>
            </div>
          </div>
        </li>
        <li className="header__navbar-item">
          <span className="header__navbar-item--connect">Kết nối</span>
        </li>
        <li className="header__navbar-item">
          <Link to="/" className="header__navbar-item-link">
            <i className="header__navbar-icon">
              <BsFacebook />
            </i>
          </Link>
        </li>
        <li className="header__navbar-item">
          <Link to="/" className="header__navbar-item-link">
            <i className="header__navbar-icon">
              <BiLogoInstagramAlt />
            </i>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Navinfo;
