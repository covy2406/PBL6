import apiCustomerProfile from "api/apiCustomerProfile";
import useAuth from "hook/useAuth";

const useProfile = () => {
  const { profile, setProfile } = useAuth();
  const useprofile = async () => {
    try {
      const response = await apiCustomerProfile.getProfile();
      setProfile(response.data);
      console.log("get profile success: ", profile);
    } catch (err) {
      console.log("get profile data: " + err);
    }
  };
  return { useprofile };
};

export default useProfile;
