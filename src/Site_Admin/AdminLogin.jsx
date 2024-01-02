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
    setAuth({ isAuth: false });
  }, []);

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
      <div class="grid admin-container">
        <div class="admin-login-form">
          <div class="auth-form__container">
            <div class="auth-form__header">
              <h3 class="auth-form__heading">Đăng nhập</h3>
            </div>
            <div class="auth-form__form">
              <form onClick={(e) => handleSubmit(e)}>
                <div class="auth-form__group">
                  <input
                    type="text"
                    class="auth-form__input"
                    placeholder="Email của bạn"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div class="auth-form__group">
                  <input
                    type="password"
                    class="auth-form__input"
                    placeholder="Mật khẩu của bạn"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                <div class="auth-form__group">
                  <button class="btn auth-form__btn">Đăng nhập</button>
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
