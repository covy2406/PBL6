import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="payment-success--container">
      <h1 className="payment-success--title">Thanh Toán thành công</h1>
      <Link className="payment-success--link">Continue Shopping</Link>
    </div>
  );
};
export default PaymentSuccess;
