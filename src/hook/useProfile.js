import apiCustomerProfile from "api/apiCustomerProfile";
import useAuth from "hook/useAuth";
import { toast } from "react-toastify";

const useProfile = () => {
  const { setProfile } = useAuth();
  const useprofile = async () => {
    try {
      const response = await apiCustomerProfile.getProfile();
      if (response.data?.message) {
        toast.error("Lỗi không thể lấy thông tin tài khoản");
        return false;
      }
      window.sessionStorage.setItem("profile", JSON.stringify(response.data));
      setProfile({
        id: response.data.customer_id,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        sex: response.data.sex,
        dayOfBirth: response.data.dayOfBirth,
        avatar: response.data.avatar,
      });
      return true;
    } catch (err) {
      toast.error("Lỗi không thể lấy thông tin tài khoản");
      return false;
    }
  };
  const updatepassword = async (data) => {
    try {
      await apiCustomerProfile.updatePassword(data);
      return true;
    } catch (err) {
      toast.error("Lỗi không thể cập nhật mật khẩu");
      return false;
    }
  };
  const getprofileorders = async () => {
    try {
      const response = await apiCustomerProfile.getProfileOrders();
      if (response.data?.message) {
        toast.error("Lỗi không thể lấy thông tin đơn hàng");
        return false;
      }
      return response;
    } catch (err) {
      toast.error("Lỗi không thể lấy thông tin đơn hàng");
      return false;
    }
  };
  return { useprofile, updatepassword, getprofileorders };
};

export default useProfile;
