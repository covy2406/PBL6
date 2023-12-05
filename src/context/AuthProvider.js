import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    //if already logged in, get the access_token from localStorage
    access_token: window.localStorage.getItem("access_token") || null,
    isAuth: window.localStorage.getItem("loggedIn") || false,
    role: "user",
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
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
