import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "hook/useAuth";

const RequiredAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/login", state: { from: location } }} replace />
  );
};

export default RequiredAuth;
