import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo/Main_logo.png";
import "./css/navAuth.css";

function Navlogin({ Title = "" }) {
  return (
    <div className="navAuth">
      <div>
        <NavLink to="/" className="navAuth--toHome">
          <img src={Logo} alt="Logo" className="navAuth--logo"></img>
          <div className="navAuth--info">{Title}</div>
        </NavLink>
      </div>
      <div>
        <NavLink to="#" className="navAuth--info">
          Bạn cần giúp đỡ?
        </NavLink>
      </div>
    </div>
  );
}

export default Navlogin;
