import apiCustomerProfile from "api/apiCustomerProfile";
import useAuth from "hook/useAuth";

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
      await setProfile({
        id: response.data.customer_id,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        sex: response.data.sex,
        dayOfBirth: response.data.dayOfBirth,
      });

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
  const getprofileorders = async () => {
    try {
      const response = await apiCustomerProfile.getProfileOrders();
      if (response.data?.message) {
        console.log("profile err", response);
        return false;
      }
      return response;
    } catch (err) {
      console.log("getprofileorders err: " + err);
      return false;
    }
  };
  return { useprofile, updatepassword, getprofileorders };
};

export default useProfile;
