import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state || !state.customerInfo || !state.cartItems || !state.totalPrice) {
    return (
      <div className="confirmation-container">
        <h2>Không có thông tin đơn hàng!</h2>
        <button className="home-button" onClick={() => navigate('/')}>
          🏠 Về trang chủ
        </button>
      </div>
    );
  }

  const { customerInfo, cartItems, totalPrice } = state;

  return (
    <div className="confirmation-container">
      <h2 className="confirmation-title">🎉 Đặt hàng thành công!</h2>

      <div className="confirmation-box">
        <div className="confirmation-left">
          <h3>Thông tin khách hàng</h3>
          <p><strong>Họ và tên:</strong> {customerInfo.name}</p>
          <p><strong>Email:</strong> {customerInfo.email}</p>
          <p><strong>Địa chỉ:</strong> {customerInfo.address}</p>
          <p><strong>Phương thức thanh toán:</strong> {
            customerInfo.paymentMethod === 'credit_card' ? 'Thẻ tín dụng' :
            customerInfo.paymentMethod === 'paypal' ? 'PayPal' : 'COD'
          }</p>
        </div>

        <div className="confirmation-right">
          <h3>Đơn hàng của bạn</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <img src={item.image || 'default-image.jpg'} alt={item.name || 'Sản phẩm'}/>
              <div className="item-info">
                <p className="item-name">{item.name} x {item.quantity}</p>
                <p className="item-price">{(item.price * item.quantity).toLocaleString()}₫</p>
              </div>
            </div>
          ))}
          <hr />
          <p className="total-price">Tổng cộng: <strong>{totalPrice.toLocaleString()}₫</strong></p>
        </div>
      </div>

      <button className="home-button" onClick={() => navigate('/')}>
        🏠 Về trang chủ
      </button>
    </div>
  );
};

export default ConfirmationPage;
