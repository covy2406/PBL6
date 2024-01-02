import './css/DiscountListStyle.css';
import React from 'react';
import { useState, useEffect } from 'react';
import apiHandlePayment from 'api/apiHandlePayment';
import { CiDiscount1 } from "react-icons/ci";

const DiscountListShop = ({ shop_id }) => {
   // { shop_id }
   const [discountShop, setDiscountShop] = useState([]);
   const [error, setError] = useState(null);


   useEffect(() => {
      const fetchDiscountShop = async (discountShopId) => {
         console.log('fetchDiscountShop',);
         try {
            const resDiscountShop = await apiHandlePayment.getDiscountShop(discountShopId);
            const resData = resDiscountShop.data;
            setDiscountShop(resData);
         }
         catch (error) {
            console.error('Lỗi khi lấy mã giảm giá của Shop', error);
            setError(error);
         }
      }
      fetchDiscountShop(shop_id); // shop_id
   }, [shop_id]);

   if (error) {
      return <p>Lỗi: {error.message}</p>
   }
   const { promotions_shop_product_id, promotion_shop_id } = discountShop;

   return (
      <>
         <div className="discount__cart-list">
            <h4 className="discount__cart-heading">Danh sach ma giam gia</h4>
            <ul className="discount__cart-list-item">
               {(promotion_shop_id && promotion_shop_id.length > 0) ||
                  (promotions_shop_product_id && promotions_shop_product_id.length > 0) ? (
                  <>
                     {promotions_shop_product_id && promotions_shop_product_id.length > 0 && (
                        <>
                           <div className="discount__cart-item-title">khuyến mãi của sản phẩm</div>
                           {/* Hiển thị khuyến mãi của sản phẩm (promotions_shop_product_id) */}
                           {promotions_shop_product_id.map((productDiscountItem, index) => (
                              <li className="discount__cart-item" key={index}>
                                 <div src="" alt="" className="discount__cart-img" ><CiDiscount1 /></div>
                                 <div className="discount__cart-item-info">
                                    <div className="discount__cart-item-head">
                                       <h5 className="discount__cart-item-name">
                                          {productDiscountItem.detail}
                                       </h5>

                                       <div className="discount__cart-item-percent-wrap">
                                          {productDiscountItem.type === 0 ? (
                                             <span className="discount__cart-item-percent">
                                                Khuyễn mãi {parseInt(productDiscountItem.value).toLocaleString("vn-VN")} đ
                                             </span>
                                          ) : (
                                             <span className="discount__cart-item-percent">
                                                khuyến mãi {productDiscountItem.value} %
                                             </span>
                                          )}
                                          {/* <div className="discount__cart-item-multiply"></div>
                                          <div className="discount__cart-item-quantity">{productDiscountItem.shopName}</div> */}
                                       </div>
                                    </div>
                                    <h5 className="discount__cart-item-name">
                                       Áp dụng khi mua sản phẩm từ {parseInt(productDiscountItem.minPriceCondition).toLocaleString("vn-VN")} đ
                                    </h5>
                                    <div className="discount__cart-item-body">
                                       <span className="discount__cart-item-description">
                                          {productDiscountItem.name}

                                       </span>
                                       <span className="discount__cart-item-date">
                                          {/* {productDiscountItem.created_at} - {productDiscountItem.updated_at} */}
                                          {productDiscountItem.code}
                                       </span>
                                    </div>
                                 </div>
                                 <input type='radio' className='discount__cart-item-select' />
                              </li>
                           ))}
                        </>
                     )}
                     <div className="discount__cart-separation"></div>
                     {promotion_shop_id && promotion_shop_id.length > 0 && (
                        <>
                           <div className="discount__cart-item-title">khuyến mãi của shop</div>
                           {/* Hiển thị khuyến mãi của cửa hàng (promotion_shop_id) */}
                           {promotion_shop_id.map((discountItem, index) => (
                              <li className="discount__cart-item" key={index}>
                                 <div src="" alt="" className="discount__cart-img" ><CiDiscount1 /></div>
                                 <div className="discount__cart-item-info">
                                    <div className="discount__cart-item-head">
                                       <h5 className="discount__cart-item-name">
                                          {discountItem.detail}
                                       </h5>
                                       <div className="discount__cart-item-percent-wrap">
                                          {discountItem.type === 0 ? (
                                             <span className="discount__cart-item-percent">
                                                khuyễn mãi {parseInt(discountItem.value).toLocaleString("vn-VN")} đ
                                             </span>
                                          ) : (
                                             <span className="discount__cart-item-percent">
                                                khuyến mãi {discountItem.value} %
                                             </span>
                                          )}
                                          {/* <div className="discount__cart-item-multiply"></div>
                                          <div className="discount__cart-item-quantity"></div> */}
                                       </div>
                                    </div>
                                    <h5 className="discount__cart-item-name">
                                       Áp dụng khi mua sản phẩm từ {parseInt(discountItem.minPriceCondition).toLocaleString("vn-VN")} đ
                                    </h5>
                                    <div className="discount__cart-item-body">
                                       <span className="discount__cart-item-description">
                                          {discountItem.shopName}
                                       </span>
                                       <span className="discount__cart-item-date">
                                          {/* {discountItem.created_at} - {discountItem.updated_at} */}
                                          {discountItem.code}
                                       </span>
                                    </div>
                                    <h5 className="discount__cart-item-name">
                                      Từ {discountItem.startDate} Đến {discountItem.endDate}
                                    </h5>
                                 </div>
                                 <input type='radio' className='discount__cart-item-select' />
                              </li>
                           ))}
                        </>
                     )}

                  </>
               ) : (
                  <p className='discount__cart-no-discount'>Không có mã giảm giá nào</p>
               )}
            </ul>
         </div>
      </>
   )
}
export default DiscountListShop;