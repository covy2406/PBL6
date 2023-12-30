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
            setDiscountWeb(resWeb);
         }
         catch (error) {
            console.error('Lỗi khi lấy mã giảm giá của Web', error);
            setError(error);
         }
         //console.log('in ra id cua api:', discountWebId);
      }
      fetchDiscountWeb();
   }, []);
   console.log(discountWeb);

   if (error) {
      return <p>Lỗi: {error.message}</p>
   }


   return (
      <div>
         <div className="discount__cart">
            <div className="discount-wrap">
               <div className="discount__list">
                  <h4 className="discount__heading">Danh sach ma giam gia</h4>
                  <ul className="discount__list-item">
                     {
                        discountWeb && discountWeb.data > 0 ? (
                           discountWeb.map((itemWeb, index) => {
                              return (
                                 <li className="discount__item" key={index}>
                                    <img src="" alt="" className="discount__img" />
                                    <div className="discount__item-info">
                                       <div className="discount__item-head">
                                          <h5 className="discount__item-name">
                                             {itemWeb.data.code}
                                          </h5>
                                          <div className="discount__item-percent-wrap">
                                             <span className="discount__item-percent">
                                                {itemWeb.data.value}
                                             </span>
                                             <div className="discount__item-multiply">
                                                x
                                             </div>
                                             <div className="discount__item-quantity">
                                                {/* {itemWeb.quantity} */}
                                             </div>
                                          </div>
                                       </div>
                                       <div className="discount__item-body">
                                          <span className="discount__item-description">
                                             {itemWeb.data.detail}
                                          </span>
                                          <span className="discount__item-date">
                                             {/* {itemWeb.created_at} - {itemWeb.updated_at} */}
                                          </span>
                                       </div>
                                    </div>
                                 </li>

                              )
                           })
                        ) : (
                           <p>Không có mã giảm giá nào</p>
                        )
                     }
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}
export default DiscountListWeb;