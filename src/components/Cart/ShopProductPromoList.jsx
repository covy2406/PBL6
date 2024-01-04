import "./css/DiscountListStyle.css";
import React from "react";
import { useEffect } from "react";
import apiHandlePayment from "api/apiHandlePayment";
import { toast } from "react-toastify";

const ShopProductPromoList = (props) => {
  // { shop_id }
  const shop_id = props.props.shop_id;
  const product_id = props.props.product_id;
  const shopProductPromo = props.props.shopProductPromo;
  const checked = props.props.checked;

  const setShopFilter = props.func.setShopFilter;
  const setShopProductPromo = props.func.setShopProductPromo;
  const handlePromoChecked = props.func.handlePromoChecked;

  //get shop discount
  useEffect(() => {
    const fetchDiscountShop = async (discountShopId) => {
      try {
        const resDiscountShop = await apiHandlePayment.getDiscountShop(
          discountShopId
        );
        const resData = resDiscountShop.data;
        // Filter promotions with matching product_id
        const matchingPromotions = resData.promotions_shop_product_id.filter(
          (promotion) => promotion.shop_product_id === product_id
        );
        setShopProductPromo(
          matchingPromotions.map((promotion) => ({
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
          products: shop.products.map((product) => {
            if (product.shop_product_id !== promoItem.shop_product_id)
              return product;
            if (!product.checked) {
              toast.error("Vui lòng chọn sản phẩm trước khi chọn mã giảm giá");
              return product;
            }
            handlePromoChecked(e, promoItem);
            const discount = handlePromoCalc(product, promoItem);
            if (e.target.checked) {
              const newDiscount = product.discount_amount + discount;
              product.code_discount.push(promoItem.code);
              return {
                ...product,
                promos: promoItem,
                discount_amount: newDiscount,
              };
            } else {
              console.log("Bỏ chọn mã giảm giá thành công", promoItem);
              const newDiscount = product.discount_amount - discount;
              product.code_discount.splice(
                product.code_discount.indexOf(promoItem.code),
                1
              );
              return {
                ...product,
                promos: null,
                discount_amount: newDiscount,
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
          {!checked ? (
            <>
              <p className="discount__cart-no-discount">
                Vui lòng chọn sản phẩm trước khi chọn mã giảm giá
              </p>
            </>
          ) : shopProductPromo.length > 0 ? (
            <>
              {shopProductPromo.map((productDiscountItem, index) => (
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
export default ShopProductPromoList;
