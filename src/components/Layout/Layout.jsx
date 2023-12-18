import Nav from "../Header/nav";
import Footer from "../Footer/footer";
//import Pages from "pages/Pages";
import { Outlet } from "react-router-dom";
//import { Outlet } from "react-router-dom";

function Layout( cart ) {
    return (
        <div className="Layout">
            <Nav cart={cart}/>
            <Outlet />
            <Footer />
        </div>
    );
}
export default Layout;
