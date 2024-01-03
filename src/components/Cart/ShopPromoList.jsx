import "./css/DiscountListStyle.css";
import React from "react";
import { useState, useEffect } from "react";
import apiHandlePayment from "api/apiHandlePayment";
import { toast } from "react-toastify";

const ShopPromoList = (props) => {
  const [shopPromo, setShopPromo] = useState([]);

  const shop_id = props.props.shop_id;
  const setTotalprice = props.func.setTotalprice;
  const setSelectedProducts = props.func.setSelectedProducts;

  //get shop discount
  useEffect(() => {
    const fetchDiscountShop = async (discountShopId) => {
      console.log("fetchDiscountShop");
      try {
        const resDiscountShop = await apiHandlePayment.getDiscountShop(
          discountShopId
        );
        const resData = resDiscountShop.data;
        setShopPromo(resData.promotion_shop_id);
      } catch (error) {
        console.error("Lỗi khi lấy mã giảm giá của Shop", error);
      }
    };
    fetchDiscountShop(shop_id); // shop_id
  }, [shop_id]);

  const handlePromoChecked = (e, promoItem) => {
    if (e.target.checked) {
      setShopPromo((prevShopProductPromo) => {
        return prevShopProductPromo.map((prevPromoItem) => {
          if (prevPromoItem.id === promoItem.id) {
            return { ...prevPromoItem, checked: true };
          }
          return prevPromoItem;
        });
      });
    } else {
      setShopPromo((prevShopProductPromo) => {
        return prevShopProductPromo.map((prevPromoItem) => {
          if (prevPromoItem.id === promoItem.id) {
            return { ...prevPromoItem, checked: false };
          }
          return prevPromoItem;
        });
      });
    }
  };

  const handlePromoCalc = (product) => {
    let discount = 0;
    if (product.promos) {
      if (product.promos.type === 0) {
        discount = parseInt(product.promos.value);
      } else {
        discount = (product.promos.value * product.total_price) / 100;
      }
    }
    return discount;
  };

  const handleChoosePromo = (e, promoItem) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.length === 0) {
        console.log(prevSelectedProducts);
        toast.error("Vui lòng chọn sản phẩm trước khi chọn mã giảm giá");
        return [];
      } else {
      }
    });
  };

  return (
    <>
      <div className="discount__cart-list">
        <h4 className="discount__cart-heading">Danh sach ma giam gia</h4>
        <ul className="discount__cart-list-item">
          {shopPromo ? (
            <>
              <div className="discount__cart-item-title">
                khuyến mãi của shop
              </div>
              {shopPromo.map((productDiscountItem, index) => (
                <li className="discount__cart-item" key={index}>
                  <div className="discount__cart-item-info">
                    <div className="discount__cart-item-head">
                      <h5 className="discount__cart-item-name">
                        Khuyến mãi: {productDiscountItem.detail}
                      </h5>
                      <div className="discount__cart-item-percent-wrap">
                        {productDiscountItem.type === 0 ? (
                          <span className="discount__cart-item-percent">
                            Khuyễn mãi{" "}
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
                  {console.log(productDiscountItem.checked, "test")}
                  <input
                    type="checkbox"
                    className="discount__cart-item-select"
                    checked={productDiscountItem.checked}
                    onChange={(e) => handleChoosePromo(e, productDiscountItem)}
                  />
                </li>
              ))}
            </>
          ) : (
            <p className="discount__cart-no-discount">
              Không có mã giảm giá nào
            </p>
          )}
        </ul>
      </div>
    </>
  );
};
export default ShopPromoList;
