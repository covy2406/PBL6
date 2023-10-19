import React from "react";
import {BsInstagram} from 'react-icons/bs';
import {BsFacebook} from 'react-icons/bs';
import {BsLinkedin} from 'react-icons/bs';
import '../../assets/css/base.css';
import '../../assets/css/footer.css';
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
                                    <a href="/" className="footer-item__link">Trung tâm trợ giúp</a>
                                </li>
                                <li className="footer-item">
                                    <a href="/" className="footer-item__link">ThaoVy-Shop Mall</a>
                                </li>
                                <li className="footer-item">
                                    <a href="/" className="footer-item__link">Hướng dẫn mua hàng</a>
                                </li>
                            </ul>
                        </div>
                        <div className="grid__column-2-10">
                            <h3 className="footer__heading">Giới thiệu</h3>
                            <ul className="footer__list">
                                <li className="footer-item">
                                    <a href="/" className="footer-item__link">Giới thiệu</a>
                                </li>
                                <li className="footer-item">
                                    <a href="/" className="footer-item__link">Tuyển dụng</a>
                                </li>
                                <li className="footer-item">
                                    <a href="/" className="footer-item__link">Điều khoản</a>
                                </li>
                            </ul>
                        </div>
                        <div className="grid__column-2-10">
                            <h3 className="footer__heading">Thanh Toán</h3>
                            <ul className="footer__list">
                                <li className="footer-item">
                                    <a href="/" className="footer-item__link">
                                        <img src="./img/vnpay.png" alt="vnpay"/>
                                    </a>
                                </li>
                                <li className="footer-item">
                                <a href="/" className="footer-item__link">
                                        <img src="./img/zalopay.png" alt="zalopay"/>
                                    </a>
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
                                    <a href="/" className="footer-item__link">
                                        <i className="footer-item__icon fab fa-facebook"><BsFacebook/></i>
                                        Facebook
                                    </a>
                                </li>
                                <li className="footer-item">
                                    <a href="/" className="footer-item__link">
                                        <i className="footer-item__icon fab fa-instagram"><BsInstagram/></i>
                                        Instagram
                                    </a>
                                </li>
                                <li className="footer-item">
                                    <a href="/" className="footer-item__link">
                                        <i className="footer-item__icon fab fa-linkedin"><BsLinkedin/></i>
                                        linkedin
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="grid__column-2-10">
                            <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
                            <div className="footer__download">
                                <img src="./img/qrcode.png" alt="Download QR" className="footer__download-qr" />
                                    <div className="footer__download-apps">
                                        <a href="/" className="footer__download-app-link">
                                            <img src="./img/google_play_logo.png" alt="Google play" className="footer__download-app-img"/>
                                        </a>
                                        <a href="/" className="footer__download-app-link">
                                            <img src="./img/apple_logo.png" alt="App store" className="footer__download-app-img"/>
                                        </a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom">
                    <div className="grid__grow">
                        <p className="footer__text">2023 - Bản quyền thuộc về nguyentranthaovy2406@gmail.com</p>
                    </div>
                </div>
                {/* <div className="grid">
                </div> */}
            </footer>
        </>
    );
};

export default Footer;
