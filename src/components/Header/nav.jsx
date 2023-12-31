import { React } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import "./css/nav.css";
import "../../assets/css/base.css";
import "../BannerHome/bannerSlider.css";
import Logo from "../../assets/Logo/4B1G.png";

//import components
import CartList from "./CartList";
import Navinfo from "./navinfo";
import NavNotification from "./navNotification";

//import Hooks
import useAuth from "hook/useAuth";
import useProfile from "hook/useProfile";
import apiSearch from "api/apiSearch";
//import NavSearch from "./NavSearch";

const Nav = ( ) => {
   const { auth, setAuth, profile, setProfile } = useAuth();
   const { useprofile } = useProfile();
   const isAuth = window.sessionStorage.getItem("isAuth");
   const location = useLocation();
   const [currentPath, setCurrentPath] = useState("");
   
   // SEARCH
   const [searchTerm, setSearchTerm] = useState('');
   const [searchResults, setSearchResults] = useState([]);
   const history = useHistory();

   useEffect(() => {
      setCurrentPath(location.pathname);
   }, [location]);

   //each time page is reload, get profile by using the current access_token
   useEffect(() => {
      if (window.sessionStorage.getItem("profile") === null) {
         console.log("get profile from api");
         useprofile();
      } else {
         setProfile(JSON.parse(window.sessionStorage.getItem("profile")));
      }
   }, []);

   // clear all when logout
   const handleLogout = (e) => {
      e.preventDefault();
      setAuth({
         access_token: null,
         role: "user",
      });
      window.sessionStorage.clear();
   };

   const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
   }



   // hàm xử lý kích vào nút search thì search
   const handleSearchSubmitResults = async (searchTerm) => {
      setSearchResults([]);
      try {
         const resSearch = await apiSearch.getAllSearch(searchTerm);
         setSearchResults(resSearch.data);
         history.push(`/search?search=${searchTerm}`);
      }
      catch (error) {
         console.error(error);
         
      }
   }

   const handleSearchSubmit = () => {
      setSearchResults([]);
      handleSearchSubmitResults(searchTerm);
   }

   return (
      <div>
         <div className="header">
            <div className="grid">
               <nav className="header__navbar">
                  <Navinfo />
                  <ul className="header__navbar-list ">
                     <li className="header__navbar-item header__navbar-item--has-notify">
                        <Link to="#" className="header__navbar-item-link">
                           <i className="header__navbar-icon-right far fa-bell">
                              <AiOutlineBell />
                           </i>
                           Thông báo
                        </Link>
                        {/* LIST CÁC MẶT HÀNG SAU KHI ĐƯỢC THÊM VÀO GIỎ HÀNG */}
                        <div className="header__notify">
                           <header className="header__notify-header">
                              <h3>Thông báo mới nhận</h3>
                           </header>
                           <NavNotification />
                           <div className="header__notify-footer">
                              <Link to="/" className="header__notify-footer-btn">
                                 Xem tất cả
                              </Link>
                           </div>
                        </div>
                     </li>
                     <li className="header__navbar-item">
                        <Link to="/contact" className="header__navbar-item-link">
                           <i className="header__navbar-icon-right fa-regular fa-circle-question"></i>
                           Trợ giúp
                        </Link>
                     </li>
                     {isAuth ? (
                        <li className="header__navbar-item header__navbar-user">
                           <img
                              src={auth.url + profile.avatar}
                              alt=""
                              className="header__navbar-user-img"
                              onLoad={(e) => {
                                 e.target.src = auth.url + profile.avatar;
                              }}></img>
                           <span className="header__navbar-user-name header__navbar-item--bold">
                              {profile.name}
                           </span>
                           <ul className="header__navbar-user-menu">
                              <li className="header__navbar-user-item">
                                 <Link to="/user/account/profile">Tài khoản của tôi</Link>
                              </li>
                              {auth.role === "admin" ? (
                                 <li className="header__navbar-user-item">
                                    <Link to="/admin/product">Trang admin</Link>
                                 </li>
                              ) : null}
                              <li className="header__navbar-user-item">
                                 <Link to="/user/account/order">Đơn mua</Link>
                              </li>
                              <li
                                 className="header__navbar-user-item header__navbar-user-item--separate"
                                 onClick={(e) => handleLogout(e)}>
                                 <Link to="/login">Đăng xuất</Link>
                              </li>
                           </ul>
                        </li>
                     ) : (
                        <ul className="header__navbar-item">
                           <Link
                              to="/signup"
                              className="header__navbar-item header__navbar-item--bold header__navbar-item--separate">
                              Đăng ký
                           </Link>
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
                           <img src={Logo} alt="" className="header__logo-img"></img>
                        </Link>
                     </div>
                  </div>

                  {/* NAV SEARCH SẢN PHẨM Ô INPUT VS NÚT SEARCH Ó */}
                  {/* <NavSearch
                     handleSearchChange={handleSearchChange}
                     searchTerm={searchTerm}
                     handleSearchSubmit={handleSearchSubmit}
                  /> */}

                  <div className="header__search">
                     <div className="header__search-input-wrap">
                        <input
                           type="text"
                           className="header__search-input"
                           placeholder="Nhập để tìm kiếm sản phẩm"
                           value={searchTerm}
                           handleSearchSubmit={handleSearchSubmit}
                           onChange={handleSearchChange}
                           
                           ></input>
                        <div className="header__search-history">
                           <h3 className="header__search-history-heading">
                              Lịch sử tìm kiếm
                           </h3>
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
                  <CartList />
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
                           <Link
                              to="/"
                              className={`nav__home-item-link ${currentPath === "/" ? "active" : ""
                                 }`}>
                              Trang chủ
                           </Link>
                        </li>
                        <li className="nav__home-item">
                           <Link
                              to="/product"
                              className={`nav__home-item-link ${currentPath === "/product" ? "active" : ""
                                 }`}>
                              Sản phẩm
                           </Link>
                        </li>
                        <li className="nav__home-item">
                           <Link
                              to="/oldphone"
                              className={`nav__home-item-link ${currentPath === "/oldphone" ? "active" : ""
                                 }`}>
                              Hàng cũ
                           </Link>
                        </li>
                        <li className="nav__home-item">
                           <Link
                              to="/contact"
                              className={`nav__home-item-link ${currentPath === "/contact" ? "active" : ""
                                 }`}>
                              Liên hệ
                           </Link>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Nav;
