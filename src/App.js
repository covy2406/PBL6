import React, {useState} from 'react'
import Nav from './components/Header/nav'
import {BrowserRouter} from 'react-router-dom';
import Rout from './rout';
import Footer from './components/Footer/footer';
import Productdetail from './components/NewProduct/productdetail';


const App = () => {
    // add to cart
    const [cart, setCart] = useState([])
    //product Detail
    const [close, setClose] = useState(false)
    const [detail, setDetail] = useState([])
    //filter product
    const [product, setProduct] = useState(Productdetail)
    const searchbtn = (product) => 
    {
        const change = Productdetail.filter((x) => 
        {
        return x.Cat === product
        })
        setProduct(change)
    }
    //product detail
    const view = (product) => 
    {
        setDetail([{...product}])
        setClose(true)
    }

    // add to cart
    const addtocart = (product) => 
    {
        const exsit = cart.find((x) => 
        {
            return x.id === product.id
        })
        if(exsit)
        {
            alert("This Product is already added to cart")
        }
        else
        { 
            setCart([...cart, {...product, qty:1}])
            alert("product is added to cart")
        }
    } 
    console.log(cart)
    return (
        <>
        <BrowserRouter>
            <Nav searchbtn={searchbtn}/>
            <Rout product={product} setProduct={setProduct} detail={detail} view={view} close={close} setClose={setClose} cart={cart} setCart={setCart} addtocart={addtocart}/>
            <Footer/>
        </BrowserRouter>
        </>
    )
}

export default App

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
