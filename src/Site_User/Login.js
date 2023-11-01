import "./Css/form.css";
import LoginForm from "../components/LoginForm/LoginForm";
import Navlogin from "../components/Header/navlogin";

function SiteLogin() {
  return (
    <div>
      <Navlogin Title="Đăng nhập"></Navlogin>
      <div className="site__form">
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}

export default SiteLogin;
