import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//page import
import HeaderFooter from "./components/HeaderFooter/HeaderFooter.js";
import SiteUser from "./Site_User/SiteUser.js";
import SiteLogin from "./Site_User/Login";
import SiteSignup from "./Site_User/Signup.js";
import SiteReset from "./Site_User/Reset.js";
import Product from "./components/NewProduct/product";
import Home from "./components/Home/home";
import ErrorPage from "./ErrorPage.js";
import AdminNav from "./components/Header/adminNav.js";
import AdminProduct from "./Site_Admin/AdminProduct.js";
import AdminUser from "./Site_Admin/AdminUser.js";
import AdminShop from "./Site_Admin/AdminShop.js";

//auth

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<SiteLogin />}></Route>
      <Route path="signup" element={<SiteSignup />}></Route>
      <Route path="reset" element={<SiteReset />}></Route>
      <Route path="/" element={<HeaderFooter />}>
        <Route index element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/user">
          <Route
            path="/user/account/profile"
            element={<SiteUser extraProps="profile" />}
          />
          <Route
            path="/user/account/address"
            element={<SiteUser extraProps="address" />}
          />
          <Route
            path="/user/account/change-password"
            element={<SiteUser extraProps="change-pass" />}
          />
        </Route>
      </Route>
      <Route path="/admin" element={<AdminNav />}>
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/account" element={<AdminUser />} />
        <Route path="/admin/shop" element={<AdminShop />} />
      </Route>
      {/* 404 page */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
