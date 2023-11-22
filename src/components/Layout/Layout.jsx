import Nav from "../Header/nav";
import Footer from "../Footer/footer";
//import Pages from "pages/Pages";
import { Outlet } from "react-router-dom";
//import { Outlet } from "react-router-dom";

function Layout(props) {
  return (
    <div className="Layout">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
