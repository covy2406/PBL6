import SignupForm from "../components/SignupForm/SignupForm";
import Navlogin from "../components/Header/navlogin";
import "./Css/form.css";

function SiteSignup() {
  return (
    <>
      <Navlogin Title="ĐĂNG KÝ"></Navlogin>
      <div className="site__form">
        <SignupForm></SignupForm>
      </div>
    </>
  );
}

export default SiteSignup;
