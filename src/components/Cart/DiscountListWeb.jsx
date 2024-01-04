import "./css/DiscountListWeb.css";
import React from "react";

const DiscountListWeb = (props) => {
  const setShowDiscounts = props.func.setShowDiscounts;
  const setDiscountWeb = props.func.setDiscountWeb;

  const discountWeb = props.props.discountWeb;

  const handleChoosePromo = (promoItem) => {
    setDiscountWeb((prevDiscountWeb) => {
      return prevDiscountWeb.map((prevPromoItem) => {
        if (prevPromoItem.id === promoItem.id) {
          return { ...prevPromoItem, checked: true };
        }
        return { ...prevPromoItem, checked: false };
      });
    });
  };

  return (
    <>
      {discountWeb ? (
        <>
          <div className="discount__list">
            <button onClick={() => setShowDiscounts()}>hehe</button>
            {discountWeb.map((productDiscountItem, index) => (
              <li className="discount__cart-item" key={index}>
                <div className="discount__cart-item-info">
                  <div className="discount__cart-item-head">
                    <h5 className="discount__cart-item-name">
                      Khuyến mãi: {productDiscountItem.detail}
                    </h5>
                    <div className="discount__cart-item-percent-wrap">
                      {productDiscountItem.type === 0 ? (
                        <span className="discount__cart-item-percent">
                          Khuyến mãi{" "}
                          {parseInt(productDiscountItem.value).toLocaleString(
                            "vn-VN"
                          )}{" "}
                          đ
                        </span>
                      ) : (
                        <span className="discount__cart-item-percent">
                          Khuyến mãi {productDiscountItem.value} %
                        </span>
                      )}
                    </div>
                  </div>
                  <h5 className="discount__cart-item-name">
                    Áp dụng khi mua từ{" "}
                    {parseInt(
                      productDiscountItem.minPriceCondition
                    ).toLocaleString("vn-VN")}{" "}
                    đ
                  </h5>
                  <div className="discount__cart-item-body">
                    <span className="discount__cart-item-date">
                      {productDiscountItem.code}
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="discount"
                  className="discount__cart-item-select"
                  checked={productDiscountItem.checked}
                  onChange={() => handleChoosePromo(productDiscountItem)}
                />
              </li>
            ))}
          </div>
        </>
      ) : (
        <div>hehe</div>
      )}
    </>
  );
};
export default DiscountListWeb;
