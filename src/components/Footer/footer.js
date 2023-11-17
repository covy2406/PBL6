import icon from "../Icon";
import "../../assets/css/base.css";
import "./footer.css";
import { NavLink, Outlet } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Outlet />
        <div className="grid">
          <div className="grid__row">
            <div className="grid__column-2-10">
              <h3 className="footer__heading">Chăm sóc khách hàng</h3>
              <ul className="footer__list">
                <li className="footer-item">
                  <NavLink to="#" className="footer-item__link">
                    Trung tâm trợ giúp
                  </NavLink>
                </li>
                <li className="footer-item">
                  <NavLink to="/" className="footer-item__link">
                    ThaoVy-Shop Mall
                  </NavLink>
                </li>
                <li className="footer-item">
                  <NavLink to="#" className="footer-item__link">
                    Hướng dẫn mua hàng
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="grid__column-2-10">
              <h3 className="footer__heading">Giới thiệu</h3>
              <ul className="footer__list">
                <li className="footer-item">
                  <NavLink to="#" className="footer-item__link">
                    Giới thiệu
                  </NavLink>
                </li>
                <li className="footer-item">
                  <NavLink to="/" className="footer-item__link">
                    Tuyển dụng
                  </NavLink>
                </li>
                <li className="footer-item">
                  <NavLink to="/" className="footer-item__link">
                    Điều khoản
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="grid__column-2-10">
              <h3 className="footer__heading">Thanh Toán</h3>
              <ul className="footer__list">
                <li className="footer-item footer-item__link">
                  <img src="./img/vnpay.png" alt="vnpay" />
                </li>
                <li className="footer-item footer-item__link">
                  <img src="./img/zalopay.png" alt="zalopay" />
                </li>
                {/* <li className="footer-item">
                                    <a href="/" className="footer-item__link"></a>
                                </li> */}
              </ul>
            </div>
            <div className="grid__column-2-10">
              <h3 className="footer__heading">Theo dõi</h3>
              <ul className="footer__list">
                <li className="footer-item">
                  <NavLink to="/" className="footer-item__link">
                    <i className="footer-item__icon fab fa-facebook">
                      <icon.BsFacebook />
                    </i>
                    Facebook
                  </NavLink>
                </li>
                <li className="footer-item">
                  <NavLink to="/" className="footer-item__link">
                    <i className="footer-item__icon fab fa-instagram">
                      <icon.BsInstagram />
                    </i>
                    Instagram
                  </NavLink>
                </li>
                <li className="footer-item">
                  <NavLink to="/" className="footer-item__link">
                    <i className="footer-item__icon fab fa-linkedin">
                      <icon.BsLinkedin />
                    </i>
                    linkedin
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="grid__column-2-10">
              <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
              <div className="footer__download">
                <img
                  src="./img/qrcode.png"
                  alt="Download QR"
                  className="footer__download-qr"
                />
                <div className="footer__download-apps">
                  <NavLink to="/" className="footer__download-app-link">
                    <img
                      src="./img/google_play_logo.png"
                      alt="Google play"
                      className="footer__download-app-img"
                    />
                  </NavLink>
                  <NavLink to="/" className="footer__download-app-link">
                    <img
                      src="./img/apple_logo.png"
                      alt="App store"
                      className="footer__download-app-img"
                    />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="grid__grow">
            <p className="footer__text">
              2023 - Bản quyền thuộc về nguyentranthaovy2406@gmail.com
            </p>
          </div>
        </div>
        {/* <div className="grid">
                </div> */}
      </footer>
    </>
  );
};

export default Footer;
