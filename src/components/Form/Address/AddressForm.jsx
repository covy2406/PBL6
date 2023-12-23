import "../AccountForm.css";
import "./Address.css";
import AddressData from "./AddressData";

const AddressForm = () => {
  return (
    <div className="profileform">
      <div className="profileform__title">
        <p className="profileform__title__item">Địa chỉ của tôi</p>
      </div>
      <div className="profileform__details profileform__address__flex">
        {AddressData.map((item, index) => {
          return (
            <div className="profileform__address">
              <div
                key={index}
                onClick={(window.location.path = item.link)}
                className="profileform__address__item profileform__address--left"
                id={window.location.path === item.link ? "active" : "inactive"}>
                <div className="address__receiver">
                  {item.receiver}
                  <div className="address__split">|</div>
                  <div className="address__phone">{item.phone}</div>
                </div>
                <div className="address__address">{item.address}</div>
              </div>
              <div className="profileform__address--right">
                <button className="profileform__address__button">Xóa</button>
                <button className="profileform__address__button">Sửa</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddressForm;
