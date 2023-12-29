import "./AboutHeader.css";
import Logo from "../../../assets/Logo/4B1G.png";
import { Link } from "react-router-dom";
const AboutHeader = () => {
  return (
    <>
      <div className="about__header">
        <div className="grid about__header--container">
          <div className="about__header--logocontainer">
            <Link to="/">
              <img src={Logo} alt="logo" className="about__header--logo" />
            </Link>
          </div>
          <div className="about__header--title">Về chúng tôi</div>
        </div>
      </div>
    </>
  );
};

export default AboutHeader;
