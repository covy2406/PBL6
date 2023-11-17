import SignupForm from "../components/AuthForm/SignupForm/SignupForm";
import Footer from "../components/Footer/footer";
import Navlogin from "../components/Header/navlogin";
import "./Css/form.css";

function SiteSignup() {
  return (
    <>
      <Navlogin Title="ĐĂNG KÝ"></Navlogin>
      <div className="site__form">
        <SignupForm></SignupForm>
      </div>
      <Footer />
    </>
  );
}

export default SiteSignup;
