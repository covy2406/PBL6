import Nav from "../Header/nav";
import Footer from "../Footer/footer";
import { Outlet } from "react-router-dom";

function HeaderFooter(props) {
  return (
    <div className="headerfooter">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
export default HeaderFooter;
