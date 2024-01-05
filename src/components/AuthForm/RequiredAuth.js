import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "hook/useAuth";

const RequiredAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const path = location.pathname.startsWith("/admin")
    ? "/admin/login"
    : "login";

  return auth.isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: path, state: { from: location } }} replace />
  );
};

export default RequiredAuth;
