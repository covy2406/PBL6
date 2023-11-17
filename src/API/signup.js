import axiosClient from "./axiosClient";

const SIGNUP_URL = "customers/register";

function Signup(data) {
  return axiosClient.post(SIGNUP_URL, data);
}

export default Signup;
