import { Link } from "react-router-dom";
import { days, months, years } from "./DateData.js";
import DatePicker from "./DatePicker.js";
import "./ProfileForm.css";

const ProfileForm = () => {
  return (
    <div className="container">
      <div>
        <p>Hồ sơ của tôi</p>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div>
        <table>
          <tr>
            <td>Tên đăng nhập</td>
            <td>admin</td>
          </tr>
          <tr>
            <td>Họ và tên</td>
            <td>Nguyễn Văn A</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>duylinh12102002@gmail.com</td>
            <Link to="/change-email">Thay đổi</Link>
          </tr>
          <tr>
            <td>Số điện thoại</td>
            <td>0123456789</td>
            <Link to="/change-phone">Thay đổi</Link>
          </tr>
          <tr>
            <td>Giới tính</td>
            <td>
              <input type="radio" name="choice" id="option1" value="Option 1" />
              <label for="option1">Nam</label>
              <input type="radio" name="choice" id="option2" value="Option 2" />
              <label for="option2">Nữ</label>
              <input type="radio" name="choice" id="option3" value="Option 3" />
              <label for="option3">Khác</label>
            </td>
          </tr>
          <tr>
            <td>Ngày sinh</td>
            <td>
              <DatePicker days={days} months={months} years={years} />
            </td>
          </tr>
          <button>Lưu</button>
        </table>
      </div>
    </div>
  );
};

export default ProfileForm;
