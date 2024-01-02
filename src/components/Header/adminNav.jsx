import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/Logo/4B1G.png";
import "./css/nav.css";
import "./css/adminnav.css";
import useAuth from "hook/useAuth";

function AdminNav() {
  const { auth } = useAuth();
  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  return (
    <>
      <div className="admin__nav">
        <Link to="/admin" className="admin__nav--link">
          <img src={Logo} alt="Logo" className="admin__nav--logo"></img>
          <div className="admin__nav--title">Trang quản lý</div>
        </Link>
      </div>
      <div className="header__menu">
        <div className="grid">
          <div className="header__menu_container">
            <div className="nav__home">
              <ul className="nav__home-list">
                <li className="nav__home-item">
                  <Link
                    to="/admin/product"
                    className={`nav__home-item-link ${
                      currentPath === "/admin/product" ? "active" : ""
                    }`}>
                    Sản phẩm
                  </Link>
                </li>
                <li className="nav__home-item">
                  <Link
                    to="/admin/account"
                    className={`nav__home-item-link ${
                      currentPath === "/admin/account" ? "active" : ""
                    }`}>
                    Tài khoản
                  </Link>
                </li>
                <li className="nav__home-item">
                  <Link
                    to="/admin/shop"
                    className={`nav__home-item-link ${
                      currentPath === "/admin/shop" ? "active" : ""
                    }`}>
                    Cửa hàng
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default AdminNav;
