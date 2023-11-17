import React from "react";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
// import AuthProvider from "react-auth-kit/AuthProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <AuthProvider>
  //   <App />
  // </AuthProvider>
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
