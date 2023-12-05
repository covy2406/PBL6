import apiCustomerProfile from "api/apiCustomerProfile";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useProfile = () => {
  const { auth } = useAuth();
  const [data, setData] = useState();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const access_token = auth.access_token;
        const res = await apiCustomerProfile.getProfile(access_token);
        setData(res.data);
      } catch (err) {
        console.log("err in useProfile:", err);
      }
    };
    getProfile();
  }, [auth.access_token]);
  return { data };
};

export default useProfile;
