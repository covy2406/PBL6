import React from "react";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "context/AuthProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
