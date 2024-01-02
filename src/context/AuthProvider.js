import { createContext, useState } from "react";
import { CartProvider } from "./AddToCartContext";
import { FilterProvider } from "./FilterContext";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const storage = JSON.parse(window.sessionStorage.getItem("auth"));
  const role = window.sessionStorage.getItem("role");
  const isAuth = window.sessionStorage.getItem("isAuth");
  const url = "http://0.tcp.ap.ngrok.io:15234/";
  const [auth, setAuth] = useState({
    //if already logged in, get the access_token from sessionStorage
    access_token: storage?.access_token || null,
    isAuth: isAuth || false,
    role: role || "user",
    id: storage?.customer_id || "",
  });

  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    sex: true,
    dayOfBirth: "",
    avatar: "",
  });

  const [shopProfile, setShopProfile] = useState();

  const contextData = {
    auth,
    setAuth,
    profile,
    setProfile,
    shopProfile,
    setShopProfile,
    url
  };

  return (
    <AuthContext.Provider value={contextData}>
      <FilterProvider>
        <CartProvider>{children}</CartProvider>
      </FilterProvider>
    </AuthContext.Provider>
  );
};

export default AuthContext;
