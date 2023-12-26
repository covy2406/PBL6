import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";

import AboutHeader from "./AboutHeader";
import Footer from "components/Footer/footer";

const About = () => {
  const navigate = useNavigate();
  const handleButton = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <>
      <AboutHeader />
      <div className="grid">
        <div className="about__content">
          <div className="about--main-title">
            4B1G là nền tảng thương mại điện tử về điện thoại hàng đầu Việt Nam
          </div>
          <div className="about--sub-title">
            Ra mắt năm 2023, nền tảng thương mại 4B1G được xây dựng nhằm cung
            cấp cho người dùng những trải nghiệm an toàn và nhanh chóng khi mua
            sắm <span className="about--main-topic">ĐIỆN THOẠI </span>
            trực tuyến thông qua hệ thống hỗ trợ thanh toán và vận hành vững
            mạnh.
          </div>
          <div className="about--sub-title">
            Chúng tôi có niềm tin mạnh mẽ rằng trải nghiệm mua sắm
            <span className="about--main-topic"> ĐIỆN THOẠI </span>trực tuyến
            phải đơn giản, dễ dàng và mang đến cảm xúc vui thích. Niềm tin này
            truyền cảm hứng và thúc đẩy chúng tôi mỗi ngày tại 4B1G.
          </div>
          <button
            className="about--main-button"
            onClick={(e) => handleButton(e)}>
            Tìm hiểu 4B1G
          </button>
        </div>
        <div className="about__intro">
          <div className="about__intro--wrapper">
            <div className="about__item">
              <div className="about__item-title">Mục tiêu của chúng tôi</div>
              <div className="about__item-content">
                Chúng tôi tin tưởng vào sức mạnh khai triển của công nghệ và
                mong muốn góp phần làm cho thế giới trở nên tốt đẹp hơn bằng
                việc kết nối cộng đồng người mua và người bán thông qua việc
                cung cấp một nền tảng thương mại điện tử.
              </div>
            </div>
            <div className="about__item">
              <div className="about__item-title">Định vị của chúng tôi</div>
              <div className="about__item-content">
                Đối với người dùng trên toàn khu vực, Shopee mang đến trải
                nghiệm mua sắm trực tuyến tích hợp với vô số sản phẩm đa dạng
                chủng loại, cộng đồng người dùng năng động và chuỗi dịch vụ liền
                mạch.
              </div>
            </div>
          </div>
          <div className="about__item--big">
            <div className="about__item-title">
              Đặc điểm về con người của chúng tôi
            </div>
            <div className="about__item-content">
              Để định nghĩa chúng tôi là ai - thông qua lời nói hay cách ứng xử
              trong nhiều trường hợp khác nhau - thì thực chất, chúng tôi Gần
              gũi, Vui vẻ và Đồng lòng.
            </div>
            <div className="about__item-content">
              Đây là những đặc tính chính và nổi bật trong từng bước đường phát
              triển của Shopee.
            </div>
            <div className="about__intro--wrapper">
              <div className="about__item">
                <div className="about__item-title">Gần Gũi</div>
                <div className="about__item-content">
                  Chúng tôi có niềm tin vào tính gần gũi mà thanh liêm, nền tảng
                  vững chắc cho một cuộc sống trung thực, bình dân và thành thật
                  với bản thân.
                </div>
              </div>
              <div className="about__item">
                <div className="about__item-title">Vui Vẻ</div>
                <div className="about__item-content">
                  Chúng tôi dễ gần, đáng yêu và tràn đầy năng lượng, luôn mang
                  đến niềm vui cho những người xung quanh.
                </div>
              </div>
              <div className="about__item">
                <div className="about__item-title">Đồng Lòng</div>
                <div className="about__item-content">
                  Chúng tôi thích tận hưởng thời gian bên nhau giống như tận
                  hưởng việc mua sắm trực tuyến với người thân và bạn bè - làm
                  những việc yêu thích cùng nhau như một đại gia đình lớn.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about__journey">
          <div className="about__journey--title">Hành trình của chúng tôi</div>
          <div className="about__journey--wrapper">
            <div className="about__journey--time">21/08/2023</div>
            <div className="about__journey--line"></div>
            <div className="about__journey--content">Thành lập nhóm</div>
          </div>
          <div className="about__journey--wrapper">
            <div className="about__journey--time">20/09/2023</div>
            <div className="about__journey--line"></div>
            <div className="about__journey--content">Hoàn thiện nền móng</div>
          </div>
          <div className="about__journey--wrapper">
            <div className="about__journey--time">01/10/2023</div>
            <div className="about__journey--line"></div>
            <div className="about__journey--content">
              Hoàn thiện trang chủ của web
            </div>
          </div>
          <div className="about__journey--wrapper">
            <div className="about__journey--time">26/12/2023</div>
            <div className="about__journey--line"></div>
            <div className="about__journey--content">
              Hoàn thiện toàn bộ trang thương mại điện tử về điện thoại 4B1G
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default About;
