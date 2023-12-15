import "./Css/form.css";
import LoginForm from "../components/AuthForm/LoginForm/LoginForm";
import Navlogin from "../components/Header/navAuth";
import Footer from "../components/Footer/footer";

function SiteLogin() {
  return (
    <div>
      <Navlogin Title="ĐĂNG NHẬP"></Navlogin>
      <div className="site__form">
        <LoginForm></LoginForm>
      </div>
      <Footer />
    </div>
  );
}

export default SiteLogin;
