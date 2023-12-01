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
    })
    .catch((err) => {
      return console.log(err);
    });
  console.log(access_token);
  console.log(response);
  return response;
}
// vcl
//Handle Login
export function Login(authUser, { setAuth, setUser, setPass }, navigate, from) {
  try {
    const response = apiAuth.login(authUser).then((res) => {
      if(res && res.status === 200) {
        console.log("resssssss", res);
        setAuth({
          customer_id: res.data.customer_id,
          access_token: res.data.access_token,
          isAuth: true,
          name: UserData(res.data.access_token).name,
        });
        localStorage.setItem("access_token", res.data.access_token);
      }
      
    });
    console.log(response);
    setUser("");
    setPass("");
    navigate(from, { replace: true });
  } catch (err) {
    console.log(err);
  }
}
