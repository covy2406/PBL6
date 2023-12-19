import React from "react";
import ProfileForm from "../components/Form/Profile/ProfileForm";
import AddressForm from "../components/Form/Address/AddressForm";
import ChangePassform from "../components/Form/ChangePass/ChangePassForm";
import UserNav from "../components/Header/usernav";
//import Footer from "../components/Footer/footer";
import "./Css/user.css";

function SiteUser({ extraProps = "profile" }) {
  return (
    <div className="grid">
      <div className="siteuser">
        <div className="siteuser__nav">
          <UserNav />
          <div className="siteuser__forms">
            {extraProps === "profile" ? (
              <ProfileForm></ProfileForm>
            ) : extraProps === "address" ? (
              <AddressForm></AddressForm>
            ) : extraProps === "change-pass" ? (
              <ChangePassform></ChangePassform>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SiteUser;
