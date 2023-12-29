import './css/DiscountListStyle.css';
import React from 'react';
import { useState, useEffect } from 'react';
import apiHandlePayment from 'api/apiHandlePayment';


const DiscountListShop = ({ shop_product_id }) => {

   const [discountShop, setDiscountShop] = useState([]);
   const [error, setError] = useState(null);


   useEffect(() => {
      const fetchDiscountShop = async (discountShopId) => {
         try {
            if (discountShopId) {
               const resDiscountShop = await apiHandlePayment.getDiscountShop(discountShopId);
               const resData = resDiscountShop.data;
               setDiscountShop(resData);
            }
            else {
               return false;
            }
         }
         catch (error) {
            console.error('Lỗi khi lấy mã giảm giá của Shop', error);
            setError(error);
         }
         console.log('in ra id cua api:', discountShopId);
      }

      // Object.keys(shop_product_id).map((key)=>{return fetchDiscountShop(shop_product_id[key])});
      // Sử dụng Promise.all để đợi tất cả các yêu cầu hoàn thành trước khi cập nhật state
      const fetchData = async () => {
         try {
            if (shop_product_id && Object.keys(shop_product_id).length > 0) {
               // Kiểm tra xem shop_product_id có giá trị và không phải là đối tượng rỗng
               await Promise.all(Object.keys(shop_product_id).map((key) => fetchDiscountShop(shop_product_id[key])));
            } else {
               console.warn('shop_product_id không có giá trị hoặc là một đối tượng rỗng');
            }
         } catch (error) {
            console.error('Lỗi khi fetch dữ liệu:', error);
         }
      };
      fetchData();
   }, []);

   if (error) {
      return <p>Lỗi: {error.message}</p>
   }


   return (
      <>
         <div className="discount__cart-list">
            <h4 className="discount__cart-heading">Danh sach ma giam gia</h4>
            <ul className="discount__cart-list-item">
               {
                  discountShop && discountShop.length > 0 ? (
                     discountShop.map((discountItem, index) => {
                        return (
                           <li className="discount__cart-item" key={index}>
                              <img src="" alt="" className="discount__cart-img" />
                              <div className="discount__cart-item-info">
                                 <div className="discount__cart-item-head">
                                    <h5 className="discount__cart-item-name">
                                       {discountItem.detail}
                                    </h5>
                                    <div className="discount__cart-item-percent-wrap">
                                       <span className="discount__cart-item-percent">
                                          {discountItem.value}
                                       </span>
                                       <div className="discount__cart-item-multiply">
                                          x
                                       </div>
                                       <div className="discount__cart-item-quantity">
                                          {discountItem.quantity}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="discount__cart-item-body">
                                    <span className="discount__cart-item-description">
                                       {discountItem.code}
                                    </span>
                                    <span className="discount__cart-item-date">
                                       {/* {discountItem.created_at} - {discountItem.updated_at} */}
                                    </span>
                                 </div>
                              </div>
                           </li>

                        )
                     })
                  ) : (
                     <p className='discount__cart-no-discount'>Không có mã giảm giá nào</p>
                  )
               }
            </ul>
         </div>
      </>
   )
}
export default DiscountListShop;