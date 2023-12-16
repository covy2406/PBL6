import apiAuth from "api/apiAuth";
import { setHeaderConfigAxios } from "api/axiosClient";
import useAuth from "hook/useAuth";

const useLogin = () => {
  const { setAuth } = useAuth();
  const login = async (authUser, remember) => {
    try {
      const response = await apiAuth.login(authUser);
      const accessToken = response.data.access_token;
      if (accessToken) {
        await setAuth({
          access_token: accessToken,
          isAuth: true,
          role: authUser.email === "linh@gmail.com" ? "admin" : "user",
        });
        window.sessionStorage.setItem("access_token", accessToken);
        window.sessionStorage.setItem("loggedIn", true);
        window.sessionStorage.setItem(
          "role",
          authUser.email === "linh@gmail.com" ? "admin" : "user"
        );
        if (remember) {
          window.sessionStorage.setItem("email", authUser.email);
          window.sessionStorage.setItem("password", authUser.password);
        }
        setHeaderConfigAxios(accessToken);
        return true;
      } else {
        console.log("login failed");
        return false;
      }
    } catch (err) {
      console.log("login api: " + err);
    }
  };
  return login;
};

export default useLogin;
