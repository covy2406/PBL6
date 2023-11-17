import ResetForm from "../components/AuthForm/ResetForm/ResetForm";
import Navlogin from "../components/Header/navlogin";
import Footer from "../components/Footer/footer";
import "./Css/form.css";

function SiteReset() {
  return (
    <>
      <Navlogin Title="ĐẶT LẠI MẬT KHẨU"></Navlogin>
      <div className="site__form">
        <ResetForm></ResetForm>
      </div>
      <Footer />
    </>
  );
}

export default SiteReset;
