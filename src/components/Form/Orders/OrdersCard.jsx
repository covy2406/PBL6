import { useState } from "react";
import "./OrdersCard.css";
import "./review.css";
import useAuth from "hook/useAuth";
import { getStatusFromEn } from "datas/statusData";
import { FaStar } from "react-icons/fa";

const OrdersCard = ({ data, type }) => {
  const { url } = useAuth();
  const [toggleReview, setToggleReview] = useState(false);
  console.log(data);
  const [reviewData, setReviewData] = useState({
    order_id: data.order_id,
    rating: 0,
    comment: "",
  });
  const [selectedStar, setSelectedStar] = useState(0);
  const handleStarClick = (index) => {
    setSelectedStar(index);
    setReviewData({ ...reviewData, rating: index });
  };
  const handleRebuy = () => {
    window.location.href = `/Viewdetail/${data.shop_product_id}`;
  };

  const handleReview = () => {
    console.log(reviewData);
    setToggleReview(!toggleReview);
  };
  return (
    <>
      {type !== data.status ? null : (
        <div className="shoporderscard__container">
          <div className="shoporderscard__container--top">
            <div className="shoporderscard__shop">
              <div className="shoporderscard__shop--name">
                Cửa hàng: {data.shopName}
              </div>
            </div>
            <div className="shoporderscard__order--status">
              Tình trạng: {getStatusFromEn(data.status)}
            </div>
          </div>
          <div className="shoporderscard__product">
            <img
              className="shoporderscard__product--image"
              src={url + data.image}
              alt=""></img>
            <div className="shoporderscard__product--name">{data.name}</div>
          </div>
          <div className="shoporderscard__container--bot">
            <div className="shoporderscard--total">
              Thành tiền: {parseInt(data.total_price).toLocaleString("vn-VN")} đ
            </div>
            <div className="shoporderscard__button-list">
              <button
                className="shoporderscard__button-list--button"
                onClick={handleRebuy}>
                Mua lại
              </button>
              {data.status === "completed" ? (
                <button
                  className="shoporderscard__button-list--button"
                  onClick={handleReview}>
                  Đánh giá
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
      {toggleReview ? (
        <>
          <div className="review__overlay">
            <div className="review__container">
              <div className="review__container--top">Đánh giá</div>
              <div className="review__container--body">
                <div className="review__container--body--rating">
                  <div className="review__container--body--rating--title">
                    Đánh giá của bạn:
                  </div>
                  <div className="review__container--body--rating--stars">
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`${
                          index < selectedStar
                            ? "Rateselected"
                            : "Rateunselected"
                        }`}
                        onClick={() => handleStarClick(index + 1)}>
                        <FaStar></FaStar>
                      </i>
                    ))}
                  </div>
                </div>
                <textarea
                  placeholder="Nhập đánh giá của bạn..."
                  className="review__container--body--comment--title"
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      comment: e.target.value,
                    })
                  }></textarea>
              </div>
              <div className="review__container--bot">
                <button
                  className="review__container--bot--button"
                  onClick={() => {
                    setToggleReview(false);
                    setReviewData({
                      order_id: data.id,
                      rating: 0,
                      comment: "",
                    });
                  }}>
                  Hủy
                </button>
                <button
                  className="review__container--bot--button"
                  onClick={() => {
                    setToggleReview(false);
                    handleReview();
                  }}>
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default OrdersCard;
