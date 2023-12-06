import "./Css/form.css";
import LoginForm from "../components/AuthForm/LoginForm/LoginForm";
import Navlogin from "../components/Header/navAuth";
import Footer from "../components/Footer/footer";

function SiteLogin() {
  return (
    <div>
      <Navlogin Title="Đăng nhập"></Navlogin>
      <div className="site__form">
        <LoginForm></LoginForm>
      </div>
      <Footer className="site__form--footer" />
    </div>
  );
}

export default SiteLogin;
