import Nav from "../Header/nav";
import Footer from "../Footer/footer";
//import Pages from "pages/Pages";
import { Outlet } from "react-router-dom";
//import { Outlet } from "react-router-dom";

function Layout(product, setProduct, priceRange,
    setPrice, oldData, setOldproduct, detail,
    view, close, setClose, cart, setCart, addtocart) {
    return (
        <div className="Layout">
            <Nav cart={cart}/>
            <Outlet product={product} setProduct={setProduct} priceRange={priceRange} setPrice={setPrice} view={view} addtocart={addtocart}
            oldData={oldData} setOldproduct={setOldproduct} detail={detail} close={close} setClose={setClose} cart={cart} setCart={setCart}
            />
            <Footer />
        </div>
    );
}
export default Layout;
