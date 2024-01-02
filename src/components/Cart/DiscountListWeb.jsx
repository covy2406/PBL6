import './css/DiscountListWeb.css';
import React from 'react';
import { useState, useEffect } from 'react';
import apiHandlePayment from 'api/apiHandlePayment';


const DiscountListWeb = () => {

   const [discountWeb, setDiscountWeb] = useState([]);
   const [error, setError] = useState(null);


   useEffect(() => {
      const fetchDiscountWeb = async () => {
         try {
            const resDiscountWeb = await apiHandlePayment.getDiscountWeb();
            const resWeb = resDiscountWeb.data;
            setDiscountWeb(resWeb.data);
         }
         catch (error) {
            console.error('Lỗi khi lấy mã giảm giá của Web', error);
            setError(error);
         }

      }
      fetchDiscountWeb();
   }, []);
   console.log(discountWeb);

   if (error) {
      return <p>Lỗi: {error.message}</p>
   }


   return (
      <>
         <div className="discount__list">
            <h4 className="discount__heading">Danh sách mã giảm giá của 4B1G</h4>
            <ul className="discount__list-item">
               {discountWeb && discountWeb.length > 0 ? (
                  discountWeb.map((itemWeb, index) => (
                     <li className="discount__item" key={index}>
                        <img src="" alt="" className="discount__img" />
                        <div className="discount__item-info">
                           <div className="discount__item-head">
                              <h5 className="discount__item-name">{itemWeb.code}</h5>
                              <div className="discount__item-percent-wrap">
                                 {itemWeb.type === 0 ? (
                                    <span className="discount__item-percent">
                                       khuyến mãi {parseInt(itemWeb.value).toLocaleString('vn-VN')} đ
                                    </span>
                                 ) : (
                                    <span className="discount__item-percent">khuyến mãi {itemWeb.value} %</span>
                                 )}
                                 {/* <div className="discount__item-multiply">x</div>
                                 <div className="discount__item-quantity">{itemWeb.quantity}</div> */}
                              </div>
                           </div>
                           <div className="discount__item-body">
                              <span className="discount__item-description">{itemWeb.detail}</span>
                              {/* <span className="discount__item-date">{itemWeb.updated_at}</span> */}
                           </div>
                        </div>
                        <input type='radio' className='discount__cart-item-select' />
                     </li>
                     
                  ))
               ) : (
                  <p>Không có mã giảm giá nào</p>
               )}
            </ul>
         </div>
      </>
   )
}
export default DiscountListWeb;