import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useSignup from "hook/useSignup";
import { toast } from "react-toastify";
import "../AuthForm.css";

const PHONE_REGEX = /^\d{10}$/;
const PWD_REGEX = /^.{8,}$/;
const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

function SignupForm() {
  const navigate = useNavigate();
  // define hooks
  const signup = useSignup();
  // define states
  const [user, setUser] = useState("");

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [pass, setPass] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const [errMsg, setErrMsg] = useState(""); // error message
  const [next, setNext] = useState(false); // next = true => show form 2

  // check password, phone, email
  useEffect(() => {
    setValidPass(PWD_REGEX.test(pass));
    if (passFocus && !validPass) {
      setErrMsg("Mật khẩu phải có ít nhất 8 kí tự");
    }
  }, [pass, passFocus, validPass]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
    if (phoneFocus && !validPhone) {
      setErrMsg("Số điện thoại không hợp lệ");
    }
  }, [phone, phoneFocus, validPhone]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    if (emailFocus && !validEmail) {
      setErrMsg("Email không hợp lệ");
    }
  }, [email, emailFocus, validEmail]);

  // if user is typing, clear error message
  useEffect(() => {
    setErrMsg("");
  }, [phone, pass]);

  // show 2nd form
  const handleNext = async (e) => {
    e.preventDefault();
    if (!validPhone) {
      setErrMsg("Số điện thoại không hợp lệ");
      return;
    }
    setNext(true);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    //check error before submit
    if (!validEmail) {
      setErrMsg("Email không hợp lệ");
      return;
    }
    if (!validPass) {
      setErrMsg("Mật khẩu phải có ít nhất 8 kí tự");
      return;
    }
    // create new account
    const newAccount = {
      phone: phone,
      name: user,
      password: pass,
      email: email,
    };

    // send request to server
    if (signup(newAccount)) {
      toast.success("Đăng ký thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      {next ? (
        <form className="authform" onSubmit={handleSubmit}>
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <div className="authform--name">
            <h1>ĐĂNG KÝ</h1>
          </div>
          {/*     USER      */}
          <div className="authform--details">
            <label htmlFor="phone">Tên người dùng </label>
          </div>
          <div className="authform--input">
            <input
              type="text"
              className="input"
              placeholder="Tên người dùng"
              autoComplete="off"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          {/*     PASSWORD      */}
          <div className="authform--details">
            <label htmlFor="phone">Mật khẩu </label>
          </div>
          <div className="authform--input">
            <input
              type="password"
              className="input"
              placeholder="Mật khẩu"
              autoComplete="off"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
              required
            />
          </div>
          <div className="authform--details">
            <label htmlFor="email">Email </label>
          </div>
          <div className="authform--input">
            <input
              id="email"
              type="text"
              className="input"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              required
            />
          </div>
          <button className="button-submit">Đăng ký</button>
          <p className="p">
            Đã có tài khoản?
            <NavLink to="/login" className="authform--go-others">
              Đăng Nhập
            </NavLink>
          </p>
        </form>
      ) : (
        <form className="authform" onSubmit={handleNext}>
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <div className="authform--name">
            <h1>ĐĂNG KÝ</h1>
          </div>
          <div className="authform--details">
            <label htmlFor="phone">Số điện thoại </label>
          </div>
          <div className="authform--input">
            <input
              type="text"
              className="input"
              placeholder="Số điện thoại"
              autoComplete="off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
              required
            />
          </div>
          <button className="button-submit">Tiếp theo</button>
          <p className="p">
            Đã có tài khoản?
            <span className="authform--go-others">
              <NavLink to="/login">Đăng Nhập</NavLink>
            </span>
          </p>
        </form>
      )}
    </>
  );
}

export default SignupForm;
