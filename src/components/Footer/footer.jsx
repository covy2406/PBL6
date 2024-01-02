import { React } from "react";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../../assets/css/base.css";
import "./footer.css";
// import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="grid">
          <div className="grid__row">
            <div className="grid__column-2-10">
              <h3 className="footer__heading">Chăm sóc khách hàng</h3>
              <ul className="footer__list">
                <li className="footer-item">
                  <Link to="/help" className="footer-item__link">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    4B1G Shop
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/help/buy" className="footer-item__link">
                    Hướng dẫn mua hàng
                  </Link>
                </li>
              </ul>
            </div>
            <div className="grid__column-2-10">
              <h3 className="footer__heading">Giới thiệu</h3>
              <ul className="footer__list">
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    Giới thiệu
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/term" className="footer-item__link">
                    Điều khoản
                  </Link>
                </li>
              </ul>
            </div>
            <div className="grid__column-2-10">
              <h3 className="footer__heading">Thanh Toán</h3>
              <ul className="footer__list">
                <li className="footer-item">
                  <div className="footer-item__link">
                    <img src="/img/vnpay.png" alt="vnpay" />
                  </div>
                </li>
              </ul>
            </div>
            <div className="grid__column-2-10">
              <h3 className="footer__heading">Theo dõi</h3>
              <ul className="footer__list">
                <li className="footer-item">
                  <Link
                    to="https://www.facebook.com/profile.php?id=61555003499266"
                    className="footer-item__link">
                    <i className="footer-item__icon fab fa-facebook">
                      <BsFacebook />
                    </i>
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
            <div className="grid__column-2-10">
              <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
              <div className="footer__download">
                <img
                  src="/img/qrcode.png"
                  alt="Download QR"
                  className="footer__download-qr"
                />
                <div className="footer__download-apps">
                  <Link to="/" className="footer__download-app-link">
                    <img
                      src="/img/google_play_logo.png"
                      alt="Google play"
                      className="footer__download-app-img"
                    />
                  </Link>
                  <Link to="/" className="footer__download-app-link">
                    <img
                      src="/img/apple_logo.png"
                      alt="App store"
                      className="footer__download-app-img"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="grid__grow">
            <p className="footer__text">Đồ án PBL6 - 4B1G Shop - 2023-2024</p>
          </div>
        </div>
        {/* <div className="grid">
                </div> */}
      </footer>
    </>
  );
};

export default Footer;
