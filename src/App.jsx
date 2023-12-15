import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//page import
import Layout from "./components/Layout/Layout.jsx";
import SiteUser from "./Site_User/SiteUser.jsx";
import SiteLogin from "./Site_User/Login.jsx";
import SiteSignup from "./Site_User/Signup.jsx";
import SiteReset from "./Site_User/Reset.jsx";
import Product from "./components/NewProduct/product";
import Home from "./components/Home/home";
import ErrorPage from "./ErrorPage.jsx";
import AdminNav from "./components/Header/adminNav.jsx";
import AdminProduct from "./Site_Admin/AdminProduct.jsx";
import AdminUser from "./Site_Admin/AdminUser.jsx";
import AdminShop from "./Site_Admin/AdminShop.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/About/Contact.jsx";
import Term from "components/About/Term.jsx";

import Oldphone from "components/OldPhone/oldphone.jsx";
import Cart from "components/Cart/cart.jsx";
import Viewdetails from "components/Viewdetail/viewDetails.jsx";
import Search from "components/Search/Search.jsx";
import Shop from "./Site_Shop/Shop.jsx";

//auth
import RequiredAuth from "./components/AuthForm/RequiredAuth.js";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="login" element={<SiteLogin />}></Route>
        <Route path="signup" element={<SiteSignup />}></Route>
        <Route path="reset" element={<SiteReset />}></Route>
        <Route path="/" element={<Layout />}>
          <Route path="term" element={<Term />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route index element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/oldphone" element={<Oldphone />} />
          <Route path="/" element={<RequiredAuth />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/Viewdetail/:id" element={<Viewdetails />} />
            <Route path="/CheckoutPage"></Route>
            <Route path="/Search/:search" element={<Search />}></Route>
            <Route path="/Shop" elemen={<Shop />}></Route>
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
        </Route>
        {/* 404 page */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
