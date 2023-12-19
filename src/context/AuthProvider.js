import { createContext, useState } from "react";
import { CartProvider } from "./AddToCartContext";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const storage = JSON.parse(window.sessionStorage.getItem("auth"));
  const role = window.sessionStorage.getItem("role");
  const isAuth = window.sessionStorage.getItem("isAuth");
  const [auth, setAuth] = useState({
    //if already logged in, get the access_token from sessionStorage
    access_token: storage?.access_token || null,
    isAuth: isAuth || false,
    role: role || "user",
    id: storage?.customer_id || "",
    url: "http://0.tcp.ap.ngrok.io:19542/api",
  });

  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    sex: true,
    dayOfBirth: "",
  });

  const contextData = {
    auth,
    setAuth,
    profile,
    setProfile,
  };

  return (
    <AuthContext.Provider value={contextData}>
      <CartProvider>{children}</CartProvider>
    </AuthContext.Provider>
  );
};

export default AuthContext;
