import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../Hook/useAuth";
import { Login } from "../HandleAuth";
import apiAuth from "api/apiAuth";
import axiosClient from "api/axiosClient";

function LoginForm() {
  // define states
  const { auth, setAuth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const authUser = { email: user, password: pass };

  //save user info for next login
  const [remember, setRemember] = useState(false);

  // if user is typing, clear error message
  useEffect(() => {
    setErrMsg("");
  }, [user, pass]);

  // if user is logged in, auto login for next time
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    "auto login";
    if (window.localStorage.getItem("isLoggedIn")) {
      Login(authUser, { setAuth, setUser, setPass }, navigate, from);
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // save user info for next login
    if (remember) {
      window.localStorage.setItem("user", user);
      window.localStorage.setItem("pass", pass);
      window.localStorage.setItem("isLoggedIn", remember);
    }
    try {
      const response = await axiosClient.post("customers/login", {
        email: user,
        password: pass,
      });
      setAuth({
        customer_id: response.data.customer_id,
        access_token: response.data.access_token, //empty string instead of null to avoid errors
        name: "Thao Vy",
        isAuth: true, //set this to true if server not working to see the UI
      });
    
      console.log("login: ", response);
      setUser("");
      setPass("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log("err: " + err);
    }
  };
  return (
    <div>
      <form className="authform" onSubmit={(e) => handleSubmit(e)}>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <div className="authform--name">
          <h1>ĐĂNG NHẬP</h1>
        </div>
        <div className="authform--details">
          <label>Email </label>
        </div>
        <div className="authform--input">
          <input
            type="text"
            className="input"
            placeholder="Số điện thoại"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </div>

        <div className="authform--details">
          <label>Mật khẩu</label>
        </div>
        <div className="authform--input">
          <input
            type="password"
            className="input"
            placeholder="Mật khẩu"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            value={pass}
            required
          />
        </div>
        <div className="authform--details">
          <input
            type="checkbox"
            value={remember}
            onClick={(e) => setRemember(!remember)}
          />
          Lưu mật khẩu
        </div>
        <Link to="/reset" className="authform--go-others authform--details">
          Quên mật khẩu
        </Link>
        <button className="button-submit">Đăng nhập</button>
        <p className="authform--details__footer">
          Chưa có tài khoản?
          <Link to="/signup" className="authform--go-others">
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;