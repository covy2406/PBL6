import apiAuth from "api/apiAuth";
import { setHeaderConfigAxios } from "api/axiosClient";

const useLogin = () => {
  const login = async (authUser, remember) => {
    try {
      const response = await apiAuth.login(authUser);
      const accessToken = response.data?.access_token;
      if (accessToken) {
        window.sessionStorage.setItem("auth", JSON.stringify(response.data));
        window.sessionStorage.setItem("isAuth", true);
        window.sessionStorage.setItem(
          "role",
          authUser.email === "linh@gmail.com" ? "admin" : "user"
        );
        if (remember) {
          window.sessionStorage.setItem("email", authUser.email);
          window.sessionStorage.setItem("password", authUser.password);
        }
        setHeaderConfigAxios(accessToken);
        return response.data;
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
