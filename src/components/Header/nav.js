import React from "react";
import icon from "../Icon";
import { Link } from "react-router-dom";
import "../../assets/css/nav.css";
import "../../assets/css/base.css";
import "../../assets/css/bannerSlider.css";
import Logo from "../../assets/Logo/Main_logo.png";
import Navinfo from "./navinfo";

const Nav = ({ searchbtn = "" }) => {
  const { authUser, isAuth } = { authUser: "admin", isAuth: true };
  return (
    <div className="navbar">
      <div className="header">
        <div className="grid">
          <nav className="header__navbar">
            <Navinfo />
            <ul className="header__navbar-list">
              <li className="header__navbar-item header__navbar-item--has-notify">
                <Link to="#" className="header__navbar-item-link">
                  <i className="header__navbar-icon-right far fa-bell">
                    <icon.AiOutlineBell />
                  </i>{" "}
                  Thông báo
                </Link>
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
                    <li className="header__notify-item">
                      <Link to="/" className="header__notify-link">
                        <img
                          src="./img/dienthoai.jpg"
                          alt=""
                          className="header__notify-img"></img>
                        <div className="header__notify-info">
                          <span className="header__notify-name">
                            Dòng sản phẩm chăm sóc da cao cấp của Ohui luôn mang
                            lại chất lượng tin dùng trong hơn 30 năm qua
                          </span>
                          <span className="header__notify-description">
                            Xác thực chính xác nguồn gốc sản phẩm Ohui
                          </span>
                        </div>
                      </Link>
                    </li>
                    <li className="header__notify-item">
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
                    <li className="header__notify-item">
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
                    <li className="header__notify-item">
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
              <li className="header__navbar-item">
                <Link to="/" className="header__navbar-item-link">
                  <i className="header__navbar-icon-right fa-regular fa-circle-question"></i>
                  Trợ giúp
                </Link>
              </li>
              {isAuth ? (
                <Link
                  to="/user/account/profile"
                  className="header__navbar-item-link">
                  <i className="header__navbar-icon-right fa-regular fa-circle-question"></i>
                  Tài khoản
                </Link>
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

              {isAuth && (
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
                      <Link to="/">Đăng xuất</Link>
                    </li>
                  </ul>
                </li>
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
            <div className="header__search">
              <div className="header__search-input-wrap">
                <input
                  type="text"
                  className="header__search-input"
                  placeholder="Nhập để tìm kiếm sản phẩm"></input>
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
                  <icon.AiOutlineDown />
                </i>

                <ul className="header__search-option">
                  <li className="header__search-option-item header__search-option-item--active">
                    <span>Trong Shop</span>
                    <i className="fas fa-check">
                      <icon.AiOutlineCheck />
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
                  <icon.BiSearchAlt2 />
                </i>
              </button>
            </div>

            {/* <!-- Cart layout --> */}

            <div className="header__cart">
              <div className="header__cart-wrap">
                <i className="header__cart-icon fas fa-shopping-cart">
                  <icon.BsCart2 />
                </i>
                <span className="header__cart-notice">3</span>

                {/* <!-- No cart: header__cart-list--no-cart --> */}
                <div className="header__cart-list ">
                  <img
                    src="./img/no_cart.png"
                    alt=""
                    className="header__cart-no-cart-img"></img>
                  <span className="header__cart-list-no-cart-msg">
                    Chưa có sản phẩm
                  </span>

                  <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
                  <ul className="header__cart-list-item">
                    <li className="header__cart-item">
                      <img
                        src="./img/dienthoai.jpg"
                        alt=""
                        className="header__cart-img"></img>
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Điện thoại siêu đẹp, siêu chất, lượng hàng đầu thị
                            trường
                          </h5>
                          <div className="header__cart-item-price-wrap">
                            <span className="header__cart-item-price">
                              2.000.000đ
                            </span>
                            <span className="header__cart-item-multiply">
                              x
                            </span>
                            <span className="header__cart-item-quantity">
                              2
                            </span>
                          </div>
                        </div>
                        <div className="header__cart-item-body">
                          <span className="header__cart-item-description">
                            Phân loại: Bạc
                          </span>
                          <span className="header__cart-item-remove">Xóa</span>
                        </div>
                      </div>
                    </li>
                    <li className="header__cart-item">
                      <img
                        src="./img/dienthoai.jpg"
                        alt=""
                        className="header__cart-img"></img>
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Siêu đẹp, siêu mới, siêu bền
                          </h5>
                          <div className="header__cart-item-price-wrap">
                            <span className="header__cart-item-price">
                              2.000.000đ
                            </span>
                            <span className="header__cart-item-multiply">
                              x
                            </span>
                            <span className="header__cart-item-quantity">
                              2
                            </span>
                          </div>
                        </div>
                        <div className="header__cart-item-body">
                          <span className="header__cart-item-description">
                            Phân loại: Bạc
                          </span>
                          <span className="header__cart-item-remove">Xóa</span>
                        </div>
                      </div>
                    </li>
                    <li className="header__cart-item">
                      <img
                        src="./img/dienthoai.jpg"
                        alt=""
                        className="header__cart-img"></img>
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Điện thoại iphone
                          </h5>
                          <div className="header__cart-item-price-wrap">
                            <span className="header__cart-item-price">
                              2.000.000đ
                            </span>
                            <span className="header__cart-item-multiply">
                              x
                            </span>
                            <span className="header__cart-item-quantity">
                              2
                            </span>
                          </div>
                        </div>
                        <div className="header__cart-item-body">
                          <span className="header__cart-item-description">
                            Phân loại: Bạc
                          </span>
                          <span className="header__cart-item-remove">Xóa</span>
                        </div>
                      </div>
                    </li>
                    <li className="header__cart-item">
                      <img
                        src="./img/dienthoai.jpg"
                        alt=""
                        className="header__cart-img"></img>
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Điện thoại samsung
                          </h5>
                          <div className="header__cart-item-price-wrap">
                            <span className="header__cart-item-price">
                              2.000.000đ
                            </span>
                            <span className="header__cart-item-multiply">
                              x
                            </span>
                            <span className="header__cart-item-quantity">
                              2
                            </span>
                          </div>
                        </div>
                        <div className="header__cart-item-body">
                          <span className="header__cart-item-description">
                            Phân loại: Bạc
                          </span>
                          <span className="header__cart-item-remove">Xóa</span>
                        </div>
                      </div>
                    </li>
                    <li className="header__cart-item">
                      <img
                        src="./img/dienthoai.jpg"
                        alt=""
                        className="header__cart-img"></img>
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Điện thoại huawei
                          </h5>
                          <div className="header__cart-item-price-wrap">
                            <span className="header__cart-item-price">
                              2.000.000đ
                            </span>
                            <span className="header__cart-item-multiply">
                              x
                            </span>
                            <span className="header__cart-item-quantity">
                              2
                            </span>
                          </div>
                        </div>
                        <div className="header__cart-item-body">
                          <span className="header__cart-item-description">
                            Phân loại: Bạc
                          </span>
                          <span className="header__cart-item-remove">Xóa</span>
                        </div>
                      </div>
                    </li>
                    <li className="header__cart-item">
                      <img
                        src="./img/dienthoai.jpg"
                        alt=""
                        className="header__cart-img"></img>
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Điện thoại xiaomi
                          </h5>
                          <div className="header__cart-item-price-wrap">
                            <span className="header__cart-item-price">
                              2.000.000đ
                            </span>
                            <span className="header__cart-item-multiply">
                              x
                            </span>
                            <span className="header__cart-item-quantity">
                              2
                            </span>
                          </div>
                        </div>
                        <div className="header__cart-item-body">
                          <span className="header__cart-item-description">
                            Phân loại: Bạc
                          </span>
                          <span className="header__cart-item-remove">Xóa</span>
                        </div>
                      </div>
                    </li>
                    <li className="header__cart-item">
                      <img
                        src="./img/dienthoai.jpg"
                        alt=""
                        className="header__cart-img"></img>
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Điện thoại oppo
                          </h5>
                          <div className="header__cart-item-price-wrap">
                            <span className="header__cart-item-price">
                              2.000.000đ
                            </span>
                            <span className="header__cart-item-multiply">
                              x
                            </span>
                            <span className="header__cart-item-quantity">
                              2
                            </span>
                          </div>
                        </div>
                        <div className="header__cart-item-body">
                          <span className="header__cart-item-description">
                            Phân loại: Bạc
                          </span>
                          <span className="header__cart-item-remove">Xóa</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <Link
                    to="/"
                    className="header__cart-view-cart btn btn--primary">
                    Xem giỏ hàng
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="main_header">
        <div className="container">
            <div className="logo">
                <img src='' alt="logo"></img>
            </div>
            <div className="search_box">
                <input type='text' value='' placeholder="Nhap san pham" autoComplete=""></input>
                <button>Search</button>
            </div>
            <div className="icon">
                {
                    isAuthenticated &&
                    (
                        <div className="account">
                            <div className="user_icon">
                                <AiOutlineUser/>
                            </div>
                            <p>xin chao, {user.name}</p>
                        </div>
                    )

                }
                <div className="user_icon_two">
                    <Link to="/" className="link"><AiOutlineHeart /></Link>
                    <Link to="/cart" className="link"><BsBagCheck/></Link>
                </div>
            </div>

        </div>
    </div> */}
      <div className="header_menu">
        <div className="grid">
          <div className="header_menu_container">
            {/* <ul className="nav">
                    <li className="home_link">
                        <Link to="/" className="Link">Home</Link>
                    </li>
                    <li className="home_link">
                        <Link to="/product" className="Link">Product</Link>
                    </li>
                    <li className="home_link">
                        <Link to="/about" className="Link">About</Link>
                    </li>
                    <li className="home_link">
                        <Link to="/contact" className="Link">Contact</Link>
                    </li>
                </ul> */}
            <div className="nav_home">
              <ul>
                <li className="home_link active">
                  <Link to="/" className="home_link_Link">
                    Home
                  </Link>
                </li>
                <li className="home_link">
                  <Link to="/product" className="home_link_Link">
                    Product
                  </Link>
                </li>
                <li className="home_link">
                  <Link to="/about" className="home_link_Link">
                    Old Phone
                  </Link>
                </li>
                <li className="home_link">
                  <Link to="/contact" className="home_link_Link">
                    Contact
                  </Link>
                </li>
                <div className="home_link-line"></div>
              </ul>
            </div>
            {/* <ul className="auth">
              {isAuth ? (
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }>
                  <icon.CiLogout />
                </button>
              ) : (
                <button onClick={() => loginWithRedirect()}>
                  <icon.CiLogin />
                </button>
              )}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".home_link");
const tabActive = $(".home_link.active");

const line = $(".nav_home .home_link-line");

requestIdleCallback(function () {
  line.style.left = tabActive.offsetLeft + "px";
  line.style.width = tabActive.offsetWidth + "px";
});
tabs.forEach((tab, index) => {
  tab.onClick = function () {
    $(".home_link.active").classList.remove("active");

    line.style.left = tabActive.offsetLeft + "px";
    line.style.width = tabActive.offsetWidth + "px";

    this.classList.add("active");
  };
});

export default Nav;
