import { createContext, useState } from "react";
import { CartProvider } from "./AddToCartContext";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // define default states for auth
  const [auth, setAuth] = useState({
    customer_id: "",
    access_token: "", //empty string instead of null to avoid errors
    name: "test tên trong file AuthProvider.js",
    isAuth: false, //set this to true if server not working to see the UI
  });

  const contextData = {
    auth, setAuth,
  }
  return (
    <AuthContext.Provider value={contextData}>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthContext.Provider>
  );
};

export default AuthContext;
