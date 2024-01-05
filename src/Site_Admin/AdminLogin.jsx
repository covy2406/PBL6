import "./css/AdminLogin.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useLogin from "hook/useLogin";
import useAuth from "hook/useAuth";

const AdminLogin = () => {
  const { adminlogin } = useLogin();
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  useEffect(() => {
    sessionStorage.clear();
    setAuth({
      access_token: null,
      isAuth: false,
      role: "user",
      id: null,
    });
  }, [setAuth]);

  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //call api
    const res = await adminlogin(user);
    console.log(res);
    //check if login success
    if (res) {
      toast.success("Đang tải", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      navigate("/admin/product");
    } else {
      toast.error("Đăng nhập thất bại", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };
  return (
    <>
      <div className="grid admin-container">
        <div className="admin-login-form">
          <div className="auth-form__container">
            <div className="auth-form__header">
              <h3 className="auth-form__heading">Đăng nhập</h3>
            </div>
            <div className="auth-form__form">
              <form onClick={(e) => handleSubmit(e)}>
                <div className="auth-form__group">
                  <input
                    type="text"
                    className="auth-form__input"
                    placeholder="Email của bạn"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="auth-form__group">
                  <input
                    type="password"
                    className="auth-form__input"
                    placeholder="Mật khẩu của bạn"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                <div className="auth-form__group">
                  <button className="btn auth-form__btn">Đăng nhập</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
