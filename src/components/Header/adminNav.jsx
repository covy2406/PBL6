import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/Logo/4B1G.png";
import "./css/adminnav.css";

function AdminNav() {
  return (
    <div className="admin__nav">
      <NavLink to="/admin" className="admin__nav--link">
        <img src={Logo} alt="Logo" className="admin__nav--logo"></img>
        <div className="admin__nav--title">Trang quản lý</div>
      </NavLink>
      <div className="admin__nav--cats">
        <NavLink
          to="/admin/product"
          className="admin__nav--link admin__nav--cat">
          Sản phẩm
        </NavLink>
        <NavLink to="/admin/shop" className="admin__nav--link admin__nav--cat">
          Cửa hàng
        </NavLink>
        <NavLink
          to="/admin/account"
          className="admin__nav--link admin__nav--cat">
          Tài khoản
        </NavLink>
      </div>
      <div className="admin__outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminNav;
