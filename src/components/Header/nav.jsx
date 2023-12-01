import { React } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import "./nav.css";
import "../../assets/css/base.css";
import "../BannerHome/bannerSlider.css";
import CartList from "./CartList";
//import Logo from '../../assets/Logo/Main_logo.png';
import Navinfo from "./navinfo";
import useAuth from "../../Hook/useAuth";
// import { useParams } from 'react-router-dom';
// import apiSearch from "api/apiSearch";

const Nav = ({
    cart,
    handleSearchChange,
    handleSearchSubmit,
    searchTerm,
    searchbtn = " ",
}) => {
    // const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    //   const { authUser, isAuth } = { authUser: "admin", isAuth: true };
    //Đổi cái trên thành như dưới
    const { auth, setAuth } = useAuth();
    const authUser = auth.name;
    const isAuth = auth.isAuth;

    const location = useLocation();
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        setCurrentPath(location.pathname);
        console.log(auth.name);
    }, [location]);

    const handdleLogout = (e) => {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("pass");
        window.localStorage.removeItem("isLoggedIn");
        setAuth({
            customer_id: "",
            access_token: "", //empty string instead of null to avoid errors
            name: "test tên trong file AuthProvider.js",
            isAuth: false, //set this to true if server not working to see the UI });
        });
    };

    return (
        <>
            <div className="header">
                <div className="grid">
                    <nav className="header__navbar">
                        
                        <Navinfo />

                        <ul className="header__navbar-list ">
                            <li className="header__navbar-item header__navbar-item--has-notify">
                                <Link to="#" className="header__navbar-item-link">
                                    <i className="header__navbar-icon-right far fa-bell">
                                        <AiOutlineBell />
                                    </i>{" "}
                                    Thông báo
                                </Link>
                                {/* LIST CÁC MẶT HÀNG SAU KHI ĐƯỢC THÊM VÀO GIỎ HÀNG */}
                                <div className="header__notify">
                                    <header className="header__notify-header">
                                        <h3>Thông báo mới nhận</h3>
                                    </header>
                                    <ul className="header__notify-list">
                                        <li className="header__notify-item header__notify-item--viewed">
                                            <Link to="/" className="header__notify-link">
                                                <img
                                                    src="./img/dienthoai.jpg"
                                                    alt=""
                                                    className="header__notify-img"></img>
                                                <div className="header__notify-info">
                                                    <span className="header__notify-name">
                                                        Xác thực chính hãng nguồn gốc sản phẩm Ohui
                                                    </span>
                                                    <span className="header__notify-description">
                                                        Xác thực chính xác nguồn gốc sản phẩm Ohui
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="header__notify-footer">
                                        <Link href="/" className="header__notify-footer-btn">
                                            Xem tất cả
                                        </Link>
                                    </div>
                                </div>
                            </li>
                            <li className="header__navbar-item">
                                <Link to="/" className="header__navbar-item-link">
                                    <i className="header__navbar-icon-right fa-regular fa-circle-question"></i>
                                    Trợ giúp
                                </Link>
                            </li>
                            {/* <!-- <li className="header__navbar-item header__navbar-item--bold header__navbar-item--separate">Đăng ký</li>
                    <li className="header__navbar-item header__navbar-item--bold">Đăng nhập</li> --> */}
                            {isAuth ? (
                                <li className="header__navbar-item header__navbar-user">
                                    <img
                                        src="./img/dienthoai.jpg"
                                        alt=""
                                        className="header__navbar-user-img"></img>
                                    <span className="header__navbar-user-name header__navbar-item--bold">
                                        {authUser}
                                    </span>
                                    <ul className="header__navbar-user-menu">
                                        <li className="header__navbar-user-item">
                                            <Link to="/">Tài khoản của tôi</Link>
                                        </li>
                                        <li className="header__navbar-user-item">
                                            <Link to="/">Địa chỉ của tôi</Link>
                                        </li>
                                        <li className="header__navbar-user-item">
                                            <Link to="/">Đơn mua</Link>
                                        </li>
                                        <li className="header__navbar-user-item header__navbar-user-item--separate">
                                            <Link to="/" onClick={(e) => handdleLogout(e)}>
                                                Đăng xuất
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <ul className="header__navbar-item">
                                    <a
                                        href="/signup"
                                        className="header__navbar-item header__navbar-item--bold header__navbar-item--separate">
                                        Đăng ký
                                    </a>
                                    <Link
                                        to="/login"
                                        className="header__navbar-item header__navbar-item--bold">
                                        Đăng nhập
                                    </Link>
                                </ul>
                            )}
                        </ul>
                    </nav>

                    {/* <!-- header with search --> */}
                    <div className="header-with-search">
                        <div className="header__logo">
                            <div className="header__logo">
                                <Link to="/" className="header__logo-link">
                                    {/* <img src={Logo} alt="" className="header__logo-img"></img> */}
                                    <svg
                                        width="120"
                                        height="86"
                                        xmlns="http://www.w3.org/2000/svg">
                                        {/* <rect x="10" y="10" width="40" height="40" rx="10" fill="#FF5733" /> */}
                                        <text
                                            x="25"
                                            y="60"
                                            fontFamily="Roboto, sans-serif"
                                            fontSize="35"
                                            fill="#FFFFFF">
                                            4B1G
                                        </text>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="header__search">
                            <div className="header__search-input-wrap">
                                <input
                                    type="text"
                                    className="header__search-input"
                                    placeholder="Nhập để tìm kiếm sản phẩm"
                                    value={searchTerm}
                                    onChange={handleSearchChange}></input>
                                <div className="header__search-history">
                                    <h3 className="header__search-history-heading">
                                        Lịch sử tìm kiếm
                                    </h3>
                                    <ul className="header__search-history-list">
                                        <li className="header__search-history-item">
                                            <Link to="/">Kaka</Link>
                                        </li>
                                        <li className="header__search-history-item">
                                            <Link to="/">hehe</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="header__search-select">
                                <span className="header__search-select-label">Trong shop</span>
                                <i className="header__search-select-icon fa-solid fa-angle-down">
                                    <AiOutlineDown />
                                </i>

                                <ul className="header__search-option">
                                    <li className="header__search-option-item header__search-option-item--active">
                                        <span>Trong Shop</span>
                                        <i className="fas fa-check">
                                            <AiOutlineCheck />
                                        </i>
                                    </li>
                                    <li className="header__search-option-item">
                                        <span>Ngoài Shop</span>
                                        <i className="fas fa-check"></i>
                                    </li>
                                </ul>
                            </div>
                            <button className="header__search-btn">
                                <i className="header__search-btn-icon fas fa-search">
                                    <Link to={`../../Search`}>
                                        <BiSearchAlt2 />
                                    </Link>
                                </i>
                            </button>
                        </div>

                        {/* <!-- Cart layout --> */}
                        <CartList cart={cart} />
                    </div>
                </div>
            </div>

            {/* PHẦN MENU THANH CHỌN DI CHUYỂN GIỮA CÁC PAGE */}
            <div className="header__menu">
                <div className="grid">
                    <div className="header__menu_container">

                        <div className="nav__home">
                            <ul className="nav__home-list">
                                <li className="nav__home-item">
                                    <Link to="/" className={`nav__home-item-link ${currentPath === '/' ? 'active' : ''}`}>Home</Link>
                                </li>
                                <li className="nav__home-item">
                                    <Link to="/product" className={`nav__home-item-link ${currentPath === '/product' ? 'active' : ''}`}>Product</Link>
                                </li>
                                <li className="nav__home-item">
                                    <Link to="/oldphone" className={`nav__home-item-link ${currentPath === '/oldphone' ? 'active' : ''}`}>Old Phone</Link>
                                </li>
                                <li className="nav__home-item">
                                    <Link to="/contact" className={`nav__home-item-link ${currentPath === '/contact' ? 'active' : ''}`}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nav;
