import React, {useState} from 'react'
import Nav from './components/Header/nav'
import {BrowserRouter} from 'react-router-dom';
import Pages from './pages/Pages';
import Footer from './components/Footer/footer';
// import Oldphone from 'components/OldPhone/oldphone';
// import oldPhoneData from 'components/OldPhone/oldPhoneData';



const App = () => {
    // add to cart
    const [cart, setCart] = useState([])
    //product Detail
    const [close, setClose] = useState(false)
    const [detail, setDetail] = useState([])
    //filter product
    //const [oldData, setOldproduct] = useState(OldphoneData)
    const [product, setProduct] = useState([])
    // const searchbtn = (product) => 
    // {
    //     const change = Productdetail.filter((x) => 
    //     {
    //         return x.Cat === product
    //     })
    //     setProduct(change)
    // }


    //product detail
    const view = (product) => 
    {
        // Cập nhật trạng thái detail với đối tượng sản phẩm để hiển thị chi tiết sản phẩm
        setDetail([{...product}])
        // Đặt trạng thái close thành true để đóng hộp thoại chi tiết sản phẩm
        setClose(true)
    }

    // add to cart
    const addtocart = (product) => 
    {
        // Tìm kiếm sản phẩm trong giỏ hàng bằng cách sử dụng hàm find
        // x === item
        const exsit = cart.find((item) => { return item.id === product.id });

        // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1 và cập nhật giỏ hàng
        if(exsit) {
            setCart(cart.map((item) => (item.id === product.id ? {...exsit, qty: exsit.qty + 1} : item)))
            && alert("Sản phẩm này đã được thêm vào giỏ hàng")
        }

        // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào giỏ hàng với số lượng bằng 1
        else { 
            setCart([...cart, {...product, qty:1}])
        }
    } 
    
    return (
        <>
        <BrowserRouter>
            <Nav cart={cart}/>

            <Pages product={product} setProduct={setProduct} 
            detail={detail} view={view} 
            close={close} setClose={setClose} 
            cart={cart} setCart={setCart} addtocart={addtocart}
            />
            
            <Footer/>
        </BrowserRouter>
        </>
    )
}

export default App
