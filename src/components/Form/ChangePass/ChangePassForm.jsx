import "../AccountForm.css";
import "./ChangePass.css";
function ChangePassform() {
  return (
    <div className="profileform">
      <div className="profileform__title">
        <div className="profileform__title__item">Đổi mật khẩu</div>
      </div>
      <div className="profileform__details">
        <div className="passform__table">
          <table>
            <tr className="passform__table__row">
              <td className="passform__table--left">Mật khẩu cũ</td>
              <td className="passform__table--right">
                <input
                  className="passform--passinput"
                  type="text"
                  value=""
                  onChange={() => {}}></input>
              </td>
            </tr>
            <tr className="passform__table__row">
              <td className="passform__table--left">Mật khẩu mới</td>
              <td className="passform__table--right">
                <input
                  className="passform--passinput"
                  type="text"
                  value=""
                  onChange={() => {}}></input>
              </td>
            </tr>
            <tr className="passform__table__row">
              <td className="passform__table--left">Xác nhận mật khẩu mới</td>
              <td className="passform__table--right">
                <input
                  className="passform--passinput"
                  type="text"
                  value=""
                  onChange={() => {}}></input>
              </td>
            </tr>
          </table>
          <button className="passform__button">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}
export default ChangePassform;
