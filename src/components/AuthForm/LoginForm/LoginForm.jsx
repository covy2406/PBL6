import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import apiAuth from "api/apiAuth";
import useAuth from "../../../Hook/useAuth";

function LoginForm() {
  // define states
  const { setAuth } = useAuth();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //save user info for next login
  const [remember, setRemember] = useState(false);

  // if user is typing, clear error message
  useEffect(() => {
    setErrMsg("");
  }, [user, pass]);

  useEffect(() => {
    // Check if there are saved credentials in localStorage
    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");
    const savedRemember = localStorage.getItem("remember") === "true";

    if (savedRemember) {
      setUser(savedUser || "");
      setPass(savedPass || "");
      setRemember(savedRemember);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authUser = { email: user, password: pass };

    try {
      const response = await apiAuth.login(authUser);
      setAuth({
        customer_id: response.customer_id,
        access_token: response.access_token,
        isAuth: true,
      });
      localStorage.setItem("user", user);
      localStorage.setItem("pass", pass);
      localStorage.setItem("remember", remember);

      setUser("");
      setPass("");
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {success ? (
        (window.location.href = "/user")
      ) : (
        // console.log(isAuth, authUser)
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
            <input type="checkbox" />
            Lưu mật khẩu
          </div>
          <NavLink
            to="/reset"
            className="authform--go-others authform--details">
            Quên mật khẩu
          </NavLink>
          <button className="button-submit">Đăng nhập</button>
          <p className="authform--details__footer">
            Chưa có tài khoản?
            <Link to="/signup" className="authform--go-others">
              Đăng ký
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
