import apiCustomerProfile from "api/apiCustomerProfile";
import useAuth from "hook/useAuth";

const useProfile = () => {
  const { setProfile } = useAuth();
  const useprofile = async () => {
    try {
      const response = await apiCustomerProfile.getProfile();
      await setProfile(response.data);
      window.localStorage.setItem("profile", JSON.stringify(response.data));
      return true;
    } catch (err) {
      console.log("useProfile err: " + err);
      return false;
    }
  };
  return { useprofile };
};

export default useProfile;