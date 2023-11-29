import React from "react";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import ReactDOM from "react-dom/client";
//import { Auth0Provider } from '@auth0/auth0-react';
//import AuthProvider from "react-auth-kit/AuthProvider";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  //<App />
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
