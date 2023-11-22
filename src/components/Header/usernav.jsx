import { Link } from "react-router-dom";
import "./css/usernav.css";
import usernavData from "./Data/usernavData";

function UserNav() {
  return (
    <div>
      {usernavData.map((item, index) => {
        return (
          <li
            key={index}
            className="usernav__item"
            id={window.location.path === item.link ? "active" : "inactive"}>
            <Link to={item.link} className="usernav__item">
              <div className="usernav__item__icon">{item.icon}</div>
              <div className="usernav__item__user">{item.title}</div>
            </Link>
          </li>
        );
      })}
    </div>
  );
}

export default UserNav;
