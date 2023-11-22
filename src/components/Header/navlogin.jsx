import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo/Main_logo.png";

function Navlogin({ Title = "" }) {
  return (
    <div className="header header__navbar">
      <ul className="header__navbar-list">
        <li>
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="header__logo"></img>
          </NavLink>
        </li>
        <li className="header__navbar-icon">{Title}</li>
      </ul>
      <ul className="header__navbar-list">
        <li className="header__navbar-item-link">
          <NavLink to="#">Bạn cần giúp đỡ?</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navlogin;
