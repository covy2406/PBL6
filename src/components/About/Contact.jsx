import React from "react";
import { useState } from "react";
import "./css/Contact.css";

const Contact = () => {
  //define state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="aboutform">
        <div className="aboutform--title">Liên hệ với cửa hàng</div>
        <div className="aboutform--decription">
          Nếu có thắc mắc về sản phẩm, hãy liên hệ với chúng tôi qua form dưới
        </div>
        <div className="aboutform--form">
          <div className="aboutform--form__input">
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Lời nhắn"
              className="aboutform--form__input--message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button>Gửi</button>
          </div>
        </div>
        <div className="aboutform--info">
          <div className="aboutform--info__title">Thông tin liên hệ</div>
          <div className="aboutform--info__decription">
            <p>4B1G.contact@gmail.com</p>
            <p>(+84) 934 094 083</p>
            <p>193 Nguyễn Lương Bằng</p>
            <p>09:00 - 20:00</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
