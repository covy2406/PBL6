import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

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
import AdminProduct from "Site_Admin/AdminProduct.jsx";
import AdminUser from "Site_Admin/AdminUser.jsx";
import AdminShop from "Site_Admin/AdminShop.jsx";
import About from "./components/About/About/About.jsx";
import Contact from "./components/About/Contact.jsx";
import Term from "components/About/Term.jsx";

import Oldphone from "components/OldPhone/oldphone.jsx";
import Cart from "components/Cart/cart.jsx";
import Viewdetails from "components/Viewdetail/viewDetails.jsx";
import Search from "components/Search/Search.jsx";

import Shop from "./Site_Shop/Shop.jsx";
import ShopSignup from "./Site_Shop/ShopSignup.jsx";
import ShopOrders from "./Site_Shop/Components/ShopOrders.jsx";
import ShopProduct from "Site_Shop/Components/ShopProducts.jsx";
import ShopPromos from "Site_Shop/Components/ShopPromos.jsx";
//auth
import RequiredAuth from "./components/AuthForm/RequiredAuth.js";
import AdminLogin from "Site_Admin/AdminLogin.jsx";
import ViewdetailShop from "components/ViewdetailShop/ViewdetailShop.jsx";
import AdminPromo from "Site_Admin/AdminPromo.jsx";
import PaymentSuccess from "components/Cart/PaymentSuccess.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="login" element={<SiteLogin />}></Route>
        <Route path="signup" element={<SiteSignup />}></Route>
        <Route path="reset" element={<SiteReset />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="term" element={<Term />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="product" element={<Product />} />
          <Route path="oldphone" element={<Oldphone />} />
          {/* <Route path="ViewdetailShop/:id" element={<ViewdetailShop />}></Route> */}
          <Route path="Viewdetail/:id" element={<Viewdetails />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route
            path="product/Viewdetail/:id"
            element={<Viewdetails />}></Route>
          <Route
            path="oldphone/Viewdetail/:id"
            element={<Viewdetails />}></Route>
        </Route>
        <Route path="/" element={<Layout />}>
          <Route element={<RequiredAuth />}>
            <Route path="paymentSuccess" element={<PaymentSuccess />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="CheckoutPage"></Route>
            <Route path="shop">
              <Route path="details" element={<Shop extraProps="details" />} />
              <Route
                path="analytics"
                element={<Shop extraProps="analytics" />}
              />
              <Route path="orders" element={<Shop extraProps="orders" />}>
                <Route path="all" element={<ShopOrders />} />
                <Route path="pending" element={<ShopOrders />} />
                <Route path="confirmed" element={<ShopOrders />} />
                <Route path="shipping" element={<ShopOrders />} />
                <Route path="completed" element={<ShopOrders />} />
                <Route path="cancelled" element={<ShopOrders />} />
              </Route>
              <Route path="products">
                <Route path="add" element={<Shop extraProps="productadd" />} />
                <Route path="list" element={<Shop extraProps="products" />}>
                  <Route path="all" element={<ShopProduct />} />
                  <Route path="active" element={<ShopProduct />} />
                  <Route path="edit" element={<ShopProduct />} />
                </Route>
              </Route>
              <Route path="promos">
                <Route path="list" element={<Shop extraProps="promos" />}>
                  <Route path="all" element={<ShopPromos />} />
                  <Route path="active" element={<ShopPromos />} />
                </Route>
                <Route
                  path="add"
                  element={<Shop extraProps="promosadd" />}></Route>
              </Route>
            </Route>
            <Route path="user">
              <Route
                path="account/profile"
                element={<SiteUser extraProps="profile" />}
              />
              <Route
                path="account/address"
                element={<SiteUser extraProps="address" />}
              />
              <Route
                path="account/change-password"
                element={<SiteUser extraProps="change-pass" />}
              />
              <Route
                path="account/order"
                element={<SiteUser extraProps="order" />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<RequiredAuth />}>
          <Route path="/admin" element={<AdminNav />}>
            <Route path="product" element={<AdminProduct />} />
            <Route path="promos" element={<AdminPromo />} />
            <Route path="account" element={<AdminUser />} />
            <Route path="shop" element={<AdminShop />} />
          </Route>
        </Route>

        {/* 404 page */}
        <Route path="*" element={<ErrorPage />} />
      </>
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
