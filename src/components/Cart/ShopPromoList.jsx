import "./css/DiscountListStyle.css";
import React from "react";
import { useState, useEffect } from "react";
import apiHandlePayment from "api/apiHandlePayment";
import { toast } from "react-toastify";

const ShopPromoList = (props) => {
  // { shop_id }
  const shop_id = props.props.shop_id;
  const shop_total_price = props.props.shop_total_price;

  const setShopFilter = props.func.setShopFilter;

  //show promo
  const [shopPromo, setShopPromo] = useState([]);

  useEffect(() => {
    const fetchDiscountShop = async (discountShopId) => {
      try {
        const resDiscountShop = await apiHandlePayment.getDiscountShop(
          discountShopId
        );
        const resData = resDiscountShop.data.promotion_shop_id;
        setShopPromo(
          resData.map((promotion) => ({
            ...promotion,
            checked: false,
          }))
        );
      } catch (error) {
        console.error("Lỗi khi lấy mã giảm giá của Shop", error);
      }
    };
    fetchDiscountShop(shop_id);
  }, []);

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

  const handlePromoCalc = (product, promoItem) => {
    if (promoItem) {
      if (promoItem.type === 0) {
        return parseInt(promoItem.value);
      } else {
        return (promoItem.value * product.total_price) / 100;
      }
    }
  };

  const handleChoosePromo = (e, promoItem) => {
    setShopFilter((prevShopFilter) => {
      return prevShopFilter.map((shop) => {
        if (shop.shopId !== shop_id) return shop;
        return {
          ...shop,
          total_price: shop.products.map((product) => {
            if (shop.total_price === 0) {
              toast.error("Vui lòng chọn sản phẩm trước khi chọn mã giảm giá");
              return 0;
            }
            handlePromoChecked(e, promoItem);
            const discount = handlePromoCalc(product, promoItem);
            if (e.target.checked) {
              return shop.total_price - discount;
            } else {
              return shop.total_price + discount;
            }
          }, 0),
          products: shop.products.map((product) => {
            const num_products = shop.products.filter(
              (product) => product.checked === true
            ).length;
            const discount = handlePromoCalc(product, promoItem) / num_products;
            if (!product.checked) return product;
            if (e.target.checked && product.checked) {
              product.code_discount.push(promoItem.code);
              return {
                ...product,
                promos: promoItem,
                discount_amount: product.discount_amount + discount,
              };
            } else {
              console.log("Bỏ chọn mã giảm giá thành công", promoItem);
              product.code_discount.splice(
                product.code_discount.indexOf(promoItem.code),
                1
              );
              return {
                ...product,
                promos: null,
                discount_amount: product.discount_amount - discount,
              };
            }
          }),
        };
      });
    });
  };

  return (
    <>
      <div className="discount__cart-list">
        <h4 className="discount__cart-heading">Danh sách mã giảm giá</h4>
        <ul className="discount__cart-list-item">
          {shop_total_price === 0 ? (
            <>
              <p className="discount__cart-no-discount">
                Vui lòng chọn sản phẩm trước khi chọn mã giảm giá
              </p>
            </>
          ) : shopPromo?.length > 0 ? (
            <>
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
              Không có mã giảm giá nào cho sản phẩm này
            </p>
          )}
        </ul>
      </div>
    </>
  );
};
export default ShopPromoList;
