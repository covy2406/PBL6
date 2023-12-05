import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "hook/useAuth";
import apiAuth from "api/apiAuth";
import apiCustomerProfile from "api/apiCustomerProfile";
import { setHeaderConfigAxios } from "api/axiosClient";

function LoginForm() {
  // define states
  const { setAuth, setProfile } = useAuth();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [remember, setRemember] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // if user is typing, clear error message
  useEffect(() => {
    setErrMsg("");
  }, [user, pass]);

  // if user go straight to login page, clear local storage
  useEffect(() => {
    setAuth({
      access_token: null,
      customer_id: null,
      isAuth: false,
    });
    localStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authUser = { email: user, password: pass };
    try {
      const response = await apiAuth.login(authUser);
      const accessToken = response?.data?.access_token;
      setHeaderConfigAxios(accessToken);
      setAuth({
        access_token: response.data.access_token,
        customer_id: response.data.customer_id,
        isAuth: true,
      });
      setUser("");
      setPass("");
      window.localStorage.setItem("loggedIn", true);
      if (remember) {
        window.localStorage.setItem("access_token", accessToken);
      }
    } catch (err) {
      console.log("login api: " + err);
    }
    // after login, get profile data
    try {
      const response = await apiCustomerProfile.getProfile();
      setProfile(response.data);
    } catch (err) {
      console.log("get profile data: " + err);
    }
    navigate(from, { replace: true });
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
          <input type="checkbox" onChange={() => setRemember(!remember)} />
          {remember}
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
