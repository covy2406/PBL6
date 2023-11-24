// import React, {useState} from 'react'
// import Nav from './components/Header/nav'
// import {BrowserRouter} from 'react-router-dom';
// import Pages from './pages/Pages';
// import Footer from './components/Footer/footer';
// // import Oldphone from 'components/OldPhone/oldphone';
// // import oldPhoneData from 'components/OldPhone/oldPhoneData';

// const App = () => {
//     // add to cart
//     const [cart, setCart] = useState([])
//     //product Detail
//     const [close, setClose] = useState(false)
//     const [detail, setDetail] = useState([])
//     //filter product
//     //const [oldData, setOldproduct] = useState(OldphoneData)
//     const [product, setProduct] = useState([])
//     // const searchbtn = (product) =>
//     // {
//     //     const change = Productdetail.filter((x) =>
//     //     {
//     //         return x.Cat === product
//     //     })
//     //     setProduct(change)
//     // }

//     //product detail
//     const view = (product) =>
//     {
//         // Cập nhật trạng thái detail với đối tượng sản phẩm để hiển thị chi tiết sản phẩm
//         setDetail([{...product}])
//         // Đặt trạng thái close thành true để đóng hộp thoại chi tiết sản phẩm
//         setClose(true)
//     }

//     // add to cart
//     const addtocart = (product) =>
//     {
//         // Tìm kiếm sản phẩm trong giỏ hàng bằng cách sử dụng hàm find
//         // x === item
//         const exsit = cart.find((item) => { return item.id === product.id });

//         // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1 và cập nhật giỏ hàng
//         if(exsit) {
//             setCart(cart.map((item) => (item.id === product.id ? {...exsit, qty: exsit.qty + 1} : item)))
//             && alert("Sản phẩm này đã được thêm vào giỏ hàng")
//         }

//         // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào giỏ hàng với số lượng bằng 1
//         else {
//             setCart([...cart, {...product, qty:1}])
//         }
//     }

//     return (
//         <>
//         <BrowserRouter>
//             <Nav cart={cart}/>

//             <Pages product={product} setProduct={setProduct}
//             detail={detail} view={view}
//             close={close} setClose={setClose}
//             cart={cart} setCart={setCart} addtocart={addtocart}
//             />

//             <Footer/>
//         </BrowserRouter>
//         </>
//     )
// }

// export default App;

import React, { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//page import
import Layout from "./components/Layout/Layout.jsx";
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

import Oldphone from "components/OldPhone/oldphone.jsx";
import Cart from "components/Cart/cart.jsx";
import Viewdetails from "components/Viewdetail/viewDetails.jsx";
import Search from "components/Search/Search.jsx";

//auth
import RequireAuth from "components/AuthForm/requireAuth.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<SiteLogin />}></Route>
      <Route path="signup" element={<SiteSignup />}></Route>
      <Route path="reset" element={<SiteReset />}></Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/oldphone" element={<Oldphone />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/Viewdetail/:id" element={<Viewdetails />}></Route>
        <Route path="/Search/:search" element={<Search />}></Route>
        <Route path="/CheckouPage"></Route>
        <Route path="/user" element={<RequireAuth />}>
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
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={<AdminNav />}>
          <Route path="/admin/product" element={<AdminProduct />} />
          {/* <Route path="/admin/account" element={<AdminUser />} /> */}
          <Route path="/admin/shop" element={<AdminShop />} />
        </Route>
      </Route>
      {/* 404 page */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  // add to cart
  const [cart, setCart] = useState([]);
  //product Detail
  const [close, setClose] = useState(false);
  const [detail, setDetail] = useState([]);
  //filter product
  //const [oldData, setOldproduct] = useState(OldphoneData)
  const [product, setProduct] = useState([]);
  // const searchbtn = (product) =>
  // {
  //     const change = Productdetail.filter((x) =>
  //     {
  //         return x.Cat === product
  //     })
  //     setProduct(change)
  // }

  //product detail
  const view = (product) => {
    // Cập nhật trạng thái detail với đối tượng sản phẩm để hiển thị chi tiết sản phẩm
    setDetail([{ ...product }]);
    // Đặt trạng thái close thành true để đóng hộp thoại chi tiết sản phẩm
    setClose(true);
  };

  // add to cart
  const addtocart = (product) => {
    // Tìm kiếm sản phẩm trong giỏ hàng bằng cách sử dụng hàm find
    // x === item
    const exsit = cart.find((item) => {
      return item.id === product.id;
    });

    // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1 và cập nhật giỏ hàng
    if (exsit) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...exsit, qty: exsit.qty + 1 } : item
        )
      ) && alert("Sản phẩm này đã được thêm vào giỏ hàng");
    }

    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào giỏ hàng với số lượng bằng 1
    else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
