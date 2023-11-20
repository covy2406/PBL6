// import React, { useState } from 'react';
// import './checkoutStyle.css'

// const CheckoutPage = () => {
//   const [shippingAddress, setShippingAddress] = useState({
//     name: '',
//     address: '',
//     city: '',
//     country: '',
//     postalCode: ''
//   });

//   const handleShippingAddressChange = (e) => {
//     const { name, value } = e.target;
//     setShippingAddress({ ...shippingAddress, [name]: value });
//   };

//   const [paymentMethod, setPaymentMethod] = useState('');

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handlePlaceOrder = () => {
//     // Xử lý đặt hàng và thanh toán ở đây
//   };

//   return (
//     <div>
//       <h2>Thông tin giỏ hàng</h2>
//       {/* Hiển thị thông tin giỏ hàng ở đây */}

//       <h2>Địa chỉ giao hàng</h2>
//       <form>
//         <input type="text" name="name" value={shippingAddress.name} onChange={handleShippingAddressChange} placeholder="Họ và tên" />
//         <input type="text" name="address" value={shippingAddress.address} onChange={handleShippingAddressChange} placeholder="Địa chỉ" />
//         <input type="text" name="city" value={shippingAddress.city} onChange={handleShippingAddressChange} placeholder="Thành phố" />
//         <input type="text" name="country" value={shippingAddress.country} onChange={handleShippingAddressChange} placeholder="Quốc gia" />
//         <input type="text" name="postalCode" value={shippingAddress.postalCode} onChange={handleShippingAddressChange} placeholder="Mã bưu điện" />
//       </form>

//       <h2>Phương thức thanh toán</h2>
//       <div>
//         <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" onChange={handlePaymentMethodChange} />
//         <label htmlFor="creditCard">Thẻ tín dụng</label>
//       </div>
//       <div>
//         <input type="radio" id="paypal" name="paymentMethod" value="paypal" onChange={handlePaymentMethodChange} />
//         <label htmlFor="paypal">PayPal</label>
//       </div>
//       {/* Thêm các phương thức thanh toán khác ở đây nếu cần */}
      
//       <button onClick={handlePlaceOrder}>Đặt hàng và thanh toán</button>
//     </div>
//   );
// };

// export default CheckoutPage;