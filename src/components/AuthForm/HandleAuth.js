import apiAuth from "api/apiAuth";
import apiCustomerProfile from "api/apiCustomerProfile";

//Get user data
export function UserData(access_token) {
  const response = apiCustomerProfile
    .getProfile({
      token: access_token,
    })
    .then((res) => {
      return console.log(res);
    });
  console.log(access_token);
  console.log(response);
  return response;
}

//Handle Login
export function Login(authUser, { setAuth, setUser, setPass }, navigate, from) {
  try {
    const response = apiAuth.login(authUser);
    console.log("login: ", response);
    setAuth({
      customer_id: response.customer_id,
      access_token: response.access_token,
      isAuth: true,
      name: UserData(response.access_token).name,
    });
    setUser("");
    setPass("");
    navigate(from, { replace: true });
  } catch (err) {
    console.log(err);
  }
}
