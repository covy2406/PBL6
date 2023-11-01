import React from "react";
import {
  Routes,
  Route,
  // RouterProvider,
  // createBrowserRouter,
  // createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home/home";
import Product from "./components/NewProduct/product";
// import Cart from './cart'
// import Contact from './contact'
const Rout = ({
  product,
  setProduct,
  detail,
  view,
  close,
  setClose,
  cart,
  setCart,
  addtocart,
}) => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              detail={detail}
              view={view}
              close={close}
              setClose={setClose}
              addtocart={addtocart}
            />
          }
        />
        <Route
          path="/product"
          element={
            <Product
              product={product}
              setProduct={setProduct}
              detail={detail}
              view={view}
              close={close}
              setClose={setClose}
              addtocart={addtocart}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Rout;
