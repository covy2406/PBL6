import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home/home';
import Product from '../components/NewProduct/product';
import Oldphone from 'components/OldPhone/oldphone';
import Cart from '../components/Cart/cart';
import Viewdetails from '../components/Viewdetail/viewDetails';
import Search from '../components/Search/Search';



const Pages = ({ product, setProduct, priceRange,
   setPrice, oldData, setOldproduct, detail,
   view, close, setClose, cart, setCart, addtocart }) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home detail={detail} view={view} close={close} setClose={setClose} addtocart={addtocart} />}></Route>
        <Route path='/product' element={<Product product={product} setProduct={setProduct} priceRange={priceRange} setPrice={setPrice} view={view} addtocart={addtocart} />}></Route>
        <Route path='/oldphone' element={<Oldphone oldData={oldData} setOldproduct={setOldproduct} detail={detail} view={view} close={close} setClose={setClose} cart={cart} addtocart={addtocart} />}></Route>
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />}></Route>
        <Route path='/Viewdetail/:id' element={<Viewdetails addtocart={addtocart} view={view} detail={detail} close={close} setClose={setClose} />} ></Route>
        <Route path='/CheckoutPage'></Route>
        <Route path='/Search/:search' element={<Search view={view} detail={detail} addtocart={addtocart}></Search>}></Route>
      </Routes>
    </>
  )
}

export default Pages;