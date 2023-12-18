import Nav from "../Header/nav";
import Footer from "../Footer/footer";
import { Outlet } from "react-router-dom";

function Layout(cart) {
  return (
    <div className="Layout">
      <Nav cart={cart} />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
