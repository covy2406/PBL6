import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // define default states for auth
  const [auth, setAuth] = useState({
    customer_id: "",
    access_token: "", //empty string instead of null to avoid errors
    name: "test tên trong file AuthProvider.js",
    isAuth: false, //set this to true if server not working to see the UI
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
