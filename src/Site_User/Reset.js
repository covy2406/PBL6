import ResetForm from "../components/ResetForm/ResetForm";
import Navlogin from "../components/Header/navlogin";
import "./Css/form.css";

function SiteReset() {
  return (
    <>
      <Navlogin Title="ĐẶT LẠI MẬT KHẨU"></Navlogin>
      <div className="site__form">
        <ResetForm></ResetForm>
      </div>
    </>
  );
}

export default SiteReset;
