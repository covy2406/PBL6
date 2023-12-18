import apiCustomerProfile from "api/apiCustomerProfile";
import useAuth from "./useAuth";

const useProfile = () => {
  const { setProfile } = useAuth();
  const useprofile = async () => {
    try {
      const response = await apiCustomerProfile.getProfile();
      if (response.data?.message) {
        console.log("profile err", response);
        return false;
      }
      window.sessionStorage.setItem("profile", JSON.stringify(response.data));
      setProfile(JSON.parse(window.sessionStorage.getItem("profile")));
      return true;
    } catch (err) {
      console.log("useProfile err: " + err);
      return false;
    }
  };
  const updatepassword = async (data) => {
    try {
      await apiCustomerProfile.updatePassword(data);
      return true;
    } catch (err) {
      console.log("updatepassword err: " + err);
      return false;
    }
  };
  return { useprofile, updatepassword };
};

export default useProfile;
