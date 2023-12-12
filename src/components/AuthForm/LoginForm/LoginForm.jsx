import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
//import hook
import useLogin from "hook/useLogin";
import useAuth from "hook/useAuth";

import { toast } from "react-toastify";

function LoginForm() {
  // define hooks
  const { setAuth } = useAuth();
  const login = useLogin();

  //define states
  const [user, setUser] = useState(window.localStorage.getItem("email") || "");
  const [pass, setPass] = useState(
    window.localStorage.getItem("password") || ""
  );
  const [remember, setRemember] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //define url
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // if user is typing, clear error message
  useEffect(() => {
    setErrMsg("");
  }, [user, pass]);

  // if user go straight to login page, clear local storage
  useEffect(() => {
    localStorage.clear();
    setAuth({
      access_token: null,
      isAuth: false,
      role: "user",
    });
  }, [setAuth]);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //define data package
    const authUser = { email: user, password: pass };
    //call api
    const loggedIn = await login(authUser, remember);
    console.log("handling submit");
    //check if login success
    if (loggedIn) {
      toast.success("Đang tải", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(from, { replace: true });
    } else {
      toast.error("Đăng nhập thất bại!");
    }
  };
  return (
    <>
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
            placeholder="Email"
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
          <input type="checkbox" onClick={() => setRemember(!remember)} />
          {/* {remember ? 1 : 0} */}
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
    </>
  );
}

export default LoginForm;
