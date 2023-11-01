import React, { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  // BrowserRouter,
} from "react-router-dom";
// import Rout from "./rout";
import Footer from "./components/Footer/footer";
import Productdetail from "./components/NewProduct/productdetail";

//page import
import Nav from "./components/Header/nav.js";
import User from "./Site_User/User";
import SiteLogin from "./Site_User/Login";
import SiteSignup from "./Site_User/Signup.js";
import SiteReset from "./Site_User/Reset.js";
import Product from "./components/NewProduct/product";
import Home from "./components/Home/home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Footer />}>
      <Route path="user" element={<User />}></Route>
      <Route path="login" element={<SiteLogin />}></Route>
      <Route path="signup" element={<SiteSignup />}></Route>
      <Route path="reset" element={<SiteReset />}></Route>
      <Route path="/" element={<Nav />}>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/user" element={<User />} />
      </Route>
    </Route>
  )
);
const App = () => {
  // // add to cart
  // const [cart, setCart] = useState([]);
  // //product Detail
  // const [close, setClose] = useState(false);
  // const [detail, setDetail] = useState([]);
  // //filter product
  // const [product, setProduct] = useState(Productdetail);
  // const searchbtn = (product) => {
  //   const change = Productdetail.filter((x) => {
  //     return x.Cat === product;
  //   });
  //   setProduct(change);
  // };
  // //product detail
  // const view = (product) => {
  //   setDetail([{ ...product }]);
  //   setClose(true);
  // };

  // // add to cart
  // const addtocart = (product) => {
  //   const exsit = cart.find((x) => {
  //     return x.id === product.id;
  //   });
  //   if (exsit) {
  //     alert("This Product is already added to cart");
  //   } else {
  //     setCart([...cart, { ...product, qty: 1 }]);
  //     alert("product is added to cart");
  //   }
  // };
  // console.log(cart);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

// import React from "react";
// import Nav from "./nav";
// import {BrowserRouter} from 'react-router-dom';

// const App = () => {
//   return(
//     <>
//     <BrowserRouter>
//     <Nav/>
//     </BrowserRouter>
//     </>
//   )
// }
// export default App

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
