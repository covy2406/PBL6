import icons from "../../Icon";
const usernavData = [
  {
    title: "Hồ sơ",
    icon: <icons.FaUser />,
    link: "/user/account/profile",
  },
  // {
  //   title: "Ngân hàng",
  //   link: "/user/account/payment",
  // },
  // {
  //   title: "Địa chỉ",
  //   link: "/user/account/address",
  // },
  {
    title: "Đổi mật khẩu",
    link: "/user/account/change-password",
  },
  // {
  //   title: "Cài đặt thông báo",
  //   link: "/user/account/notification",
  // },
  {
    title: "Đơn mua",
    icon: <icons.FaFileInvoiceDollar />,
    link: "/user/account/order",
  },
];
export default usernavData;
