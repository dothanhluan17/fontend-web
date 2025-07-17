import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  // Lấy orderId từ query trên URL
  const query = new URLSearchParams(location.search);
  const orderId = query.get('orderId');

  useEffect(() => {
    if (location.state) {
      setOrderData(location.state);
    } else if (orderId) {
      // Nếu có orderId trên URL, gọi API lấy thông tin đơn hàng
      fetch(`${import.meta.env.VITE_API_URL}/orders/orderid/${orderId}`)
        .then(res => res.json())
        .then(data => setOrderData(data))
        .catch(() => setOrderData(null));
    } else {
      // Lấy từ localStorage nếu không có trong state
      const storedOrder = localStorage.getItem('lastOrder');
      if (storedOrder) {
        setOrderData(JSON.parse(storedOrder));
        localStorage.removeItem('lastOrder');
      }
    }
  }, [location.state, orderId]);

  if (!orderData) {
    return (
      <div className="confirmation-container">
        <h2>Không có thông tin đơn hàng!</h2>
        <button className="home-button" onClick={() => navigate('/')}>
          🏠 Về trang chủ
        </button>
      </div>
    );
  }

  // Chuẩn hóa dữ liệu cho cả trường hợp lấy từ API và local
  const customerInfo = orderData.customerInfo || orderData.customer || {};
  const cartItems = orderData.orderItems || orderData.cartItems || [];
  const totalPrice = orderData.totalPrice || orderData.total || 0;
  const paymentMethod = orderData.paymentMethod || customerInfo.paymentMethod;

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'momo':
        return 'MoMo';
      case 'vnpay':
        return 'VNPAY';
      case 'zalopay':
        return 'ZaloPay';
      case 'cash_on_delivery':
        return 'Thanh toán khi nhận hàng';
      case 'bank_transfer':
        return 'Chuyển khoản';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="confirmation-container">
      <h2 className="confirmation-title">🎉 Đặt hàng thành công!</h2>

      <div className="confirmation-box">
        <div className="confirmation-left">
          <h3>Thông tin khách hàng</h3>
          <p><strong>Họ và tên:</strong> {customerInfo.name}</p>
          <p><strong>Email:</strong> {customerInfo.email}</p>
          <p><strong>Địa chỉ:</strong> {orderData.shippingAddress?.address || customerInfo.address}</p>
          <p><strong>Phương thức thanh toán:</strong> {getPaymentMethodLabel(paymentMethod)}</p>
        </div>

        <div className="confirmation-right">
          <h3>Đơn hàng của bạn</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <img src={item.image || 'default-image.jpg'} alt={item.name || 'Sản phẩm'} />
              <div className="item-info">
                <p className="item-name">{item.name} x {item.qty || item.quantity}</p>
                <p className="item-price">{((item.price || 0) * (item.qty || item.quantity || 1)).toLocaleString()}₫</p>
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