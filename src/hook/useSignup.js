import apiAuth from "api/apiAuth";

const useSignup = () => {
  const signup = async (newAccount) => {
    try {
      const res = await apiAuth.signup(newAccount);
      console.log(res);
      if (res.status === 200) {
        return true;
      }
    } catch (err) {
      console.log("signup api: " + err);
    }
  };
  return signup;
};

export default useSignup;
