import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./css/usernav.css";
import usernavData from "./Data/usernavData";

function UserNav() {
  //get current path
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(location.pathname);
    console.log(currentPath);
  }, [location]);

  return (
    <ul className="user__nav-sidebar">
      {usernavData.map((item, index) => {
        return (
          <li key={index} className="usernav__item">
            <Link
              to={item.link}
              className="usernav__item-link"
              id={currentPath === item.link ? "active" : "inactive"}>
              <div className="usernav__item__icon">{item.icon}</div>
              <div className="usernav__item__user">{item.title}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default UserNav;
