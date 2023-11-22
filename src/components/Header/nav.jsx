import { React } from "react";
import { Link, useLocation, } from 'react-router-dom';
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from 'react-icons/bi';
import { AiOutlineBell } from 'react-icons/ai';
import { AiOutlineDown } from 'react-icons/ai';
import { AiOutlineCheck } from 'react-icons/ai';
import './nav.css';
import '../../assets/css/base.css';
import '../BannerHome/bannerSlider.css';
import CartList from "./CartList";
//import Logo from '../../assets/Logo/Main_logo.png';
import Navinfo from './navinfo'
// import { useParams } from 'react-router-dom';
// import apiSearch from "api/apiSearch";

const Nav = ({ cart, handleSearchChange, handleSearchSubmit, searchTerm, searchbtn = " " }) => {



    // const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const { authUser, isAuth } = { authUser: "admin", isAuth: true };

    const location = useLocation();
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    return (
        <>
            <div className="header">
                <div className="grid">
                    <nav className="header__navbar">
                        {/* <ul className="header__navbar-list">
                            <li className="header__navbar-item header__navbar-item--separate">Kênh người bán</li>
                            <li className="header__navbar-item header__navbar-item--separate">Trở thành người bán hàng</li>
                            <li className="header__navbar-item header__navbar-item--has-qr header__navbar-item--separate">
                                Vào cửa hàng trên ứng dụng shop
                                
                                <div className="header__qr">
                                    <img src="./img/qrcode.png" alt="QRcode" className="header__qr-img"></img>
                                    <div className="header__qr-apps">
                                        <div className="header__qr-link">
                                            <img src="./img/google_play_logo.png" alt="google play" className="header__qr-dowload-img"></img>
                                        </div>
                                        <div className="header__qr-link">
                                            <img src="./img/apple_logo.png" alt="app store" className="header__qr-dowload-img"></img>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="header__navbar-item"><span className="header__navbar-item--connect">Kết nối</span></li>
                            <li className="header__navbar-item">
                                <Link to="/" className="header__navbar-item-link"><i className="header__navbar-icon"><BsFacebook /></i></Link>

                            </li>
                            <li className="header__navbar-item">
                                <Link to="/" className="header__navbar-item-link" ><i className="header__navbar-icon"><BiLogoInstagramAlt /></i></Link>

                            </li>
                        </ul> */}
                        <Navinfo />

                        <ul className="header__navbar-list ">
                            <li className="header__navbar-item header__navbar-item--has-notify">
                                <Link to="#" className="header__navbar-item-link">
                                    <i className="header__navbar-icon-right far fa-bell"><AiOutlineBell /></i>{" "} Thông báo
                                </Link>
                                {/* LIST CÁC MẶT HÀNG SAU KHI ĐƯỢC THÊM VÀO GIỎ HÀNG */}
                                <div className="header__notify">
                                    <header className="header__notify-header">
                                        <h3>Thông báo mới nhận</h3>
                                    </header>
                                    <ul className="header__notify-list">

                                        <li className="header__notify-item header__notify-item--viewed">
                                            <Link to="/" className="header__notify-link">
                                                <img src="./img/dienthoai.jpg" alt="" className="header__notify-img"></img>
                                                <div className="header__notify-info">
                                                    <span className="header__notify-name">Xác thực chính hãng nguồn gốc sản phẩm Ohui</span>
                                                    <span className="header__notify-description">Xác thực chính xác nguồn gốc sản phẩm Ohui</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="header__notify-item">
                                            <Link to="/" className="header__notify-link">
                                                <img src="./img/dienthoai.jpg" alt="" className="header__notify-img"></img>
                                                <div className="header__notify-info">
                                                    <span className="header__notify-name">Dòng sản phẩm chăm sóc da cao cấp của Ohui luôn mang lại chất lượng tin dùng trong hơn 30 năm qua</span>
                                                    <span className="header__notify-description">Xác thực chính xác nguồn gốc sản phẩm Ohui</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="header__notify-item">
                                            <Link to="/" className="header__notify-link">
                                                <img src="./img/dienthoai.jpg" alt="" className="header__notify-img"></img>
                                                <div className="header__notify-info">
                                                    <span className="header__notify-name">Xác thực chính hãng nguồn gốc sản phẩm Ohui</span>
                                                    <span className="header__notify-description">Xác thực chính xác nguồn gốc sản phẩm Ohui</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="header__notify-item">
                                            <Link to="/" className="header__notify-link">
                                                <img src="./img/dienthoai.jpg" alt="" className="header__notify-img"></img>
                                                <div className="header__notify-info">
                                                    <span className="header__notify-name">Xác thực chính hãng nguồn gốc sản phẩm Ohui</span>
                                                    <span className="header__notify-description">Xác thực chính xác nguồn gốc sản phẩm Ohui</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="header__notify-item">
                                            <Link to="/" className="header__notify-link">
                                                <img src="./img/dienthoai.jpg" alt="" className="header__notify-img"></img>
                                                <div className="header__notify-info">
                                                    <span className="header__notify-name">Xác thực chính hãng nguồn gốc sản phẩm Ohui</span>
                                                    <span className="header__notify-description">Xác thực chính xác nguồn gốc sản phẩm Ohui</span>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="header__notify-footer">
                                        <Link href="/" className="header__notify-footer-btn">Xem tất cả</Link>
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
                            {
                                isAuth ?
                                    (
                                        <Link
                                            to="/user/account/profile"
                                            className="header__navbar-item-link">
                                            <i className="header__navbar-icon-right fa-regular fa-circle-question"></i>
                                            Tài khoản
                                        </Link>
                                    )
                                    :
                                    (
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
                                    )
                            }
                            {
                                isAuth &&
                                (
                                    <li className="header__navbar-item header__navbar-user">
                                        <img src="./img/dienthoai.jpg" alt="" className="header__navbar-user-img"></img>
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
                                                <Link to="/">Đăng xuất</Link>
                                            </li>
                                        </ul>
                                    </li>
                                )
                            }

                        </ul>
                    </nav>

                    {/* <!-- header with search --> */}
                    <div className="header-with-search">
                        <div className="header__logo">
                            <div className="header__logo">
                                <Link to="/" className="header__logo-link">
                                    {/* <img src={Logo} alt="" className="header__logo-img"></img> */}
                                    <svg width="120" height="86" xmlns="http://www.w3.org/2000/svg">
                                        {/* <rect x="10" y="10" width="40" height="40" rx="10" fill="#FF5733" /> */}
                                        <text x="25" y="60" fontFamily="Roboto, sans-serif" fontSize="35" fill="#FFFFFF">4B1G</text>
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
                                    onChange={handleSearchChange}
                                ></input>
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
                                <i className="header__search-btn-icon fas fa-search"><Link to={`../../Search`}><BiSearchAlt2 /></Link></i>
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
                                {/* <li className="nav__home-item">
                                    <Link to="/" excact className="nav__home-item-link" activeClassName="active">Home</Link>
                                </li>
                                <li className="nav__home-item">
                                    <Link to="/product" className="nav__home-item-link">Product</Link>
                                </li>
                                <li className="nav__home-item">
                                    <Link to="/oldphone" className="nav__home-item-link">Old Phone</Link>
                                </li>
                                <li className="nav__home-item">
                                    <Link to="/contact" className="nav__home-item-link">Contact</Link>
                                </li>
                                <div className="nav__home-item"></div> */}

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
                        {/* <ul className="auth">
                            {
                                isAuthenticated ?
                                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}><CiLogout /></button>
                                    :
                                    <button onClick={() => loginWithRedirect()}><CiLogin /></button>
                            }

                        </ul> */}
                        {/* <Link to="../Cart">
                            <i className="header__cart-icon"><BsCart2 /></i>
                            <span className="header__cart-notice">
                                {cart.length === 0 ? "" : cart.length}
                            </span>
                        </Link> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav