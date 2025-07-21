import React, { useState, useEffect } from 'react';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Lỗi lấy đơn hàng');

        setOrders(data);
      } catch (err) {
        console.error('Lỗi:', err.message);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || 'Cập nhật thất bại');

      setOrders(prev =>
        prev.map(order => (order._id === orderId ? updated : order))
      );

      alert(`✅ Trạng thái đơn hàng đã cập nhật thành "${newStatus}"`);
    } catch (error) {
      console.error('Lỗi cập nhật trạng thái:', error.message);
    }
  };

  const toggleDetails = (orderId) => {
    setShowDetails(prev => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="order-container">
      <h2>Quản lý đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Người đặt</th>
              <th>Email</th>
              <th>Ngày đặt</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <React.Fragment key={order._id}>
                <tr>
                  <td>{order._id}</td>
                  <td>{order.customerInfo?.name || order.user?.name}</td>
                  <td>{order.customerInfo?.email || order.user?.email}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="paid">Đã thanh toán</span>
                    ) : (
                      <span className="not-paid">Chưa thanh toán</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-${order.status}`}>
                      {order.status === 'pending' && 'Chưa xác nhận'}
                      {order.status === 'confirmed' && 'Đã xác nhận'}
                      {order.status === 'delivered' && 'Đã giao'}
                      {order.status === 'cancelled' && '❌ Đã hủy'}
                    </span>
                  </td>
                  <td>{order.totalPrice.toLocaleString('vi-VN')}₫</td>
                  <td>
                    {order.status === 'pending' && (
                      <button
                        className="btn-confirm"
                        onClick={() => updateStatus(order._id, 'confirmed')}
                      >
                        Xác nhận đơn
                      </button>
                    )}
                    {order.status === 'confirmed' && (
                      <button
                        className="btn-deliver"
                        onClick={() => updateStatus(order._id, 'delivered')}
                      >
                        Đánh dấu đã giao
                      </button>
                    )}
                    {order.status === 'delivered' && <span>✅ Hoàn thành</span>}
                    <br />
                    <button
                      className="btn-detail"
                      onClick={() => toggleDetails(order._id)}
                    >
                      {showDetails[order._id] ? 'Ẩn chi tiết ▲' : 'Chi tiết ▼'}
                    </button>
                  </td>
                </tr>

                {showDetails[order._id] && Array.isArray(order.orderItems) && (
                  <tr>
                    <td colSpan="8">
                      <div className="order-details">
                        <h4>Chi tiết đơn hàng</h4>
                        <table className="order-detail-table">
                          <thead>
                            <tr>
                              <th>Mã SP</th>
                              <th>Tên sản phẩm</th>
                              <th>Mã Seri</th>
                              <th>Số lượng</th>
                              <th>Đơn giá</th>
                              <th>Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.orderItems.map((item, i) => (
                              <tr key={i}>
                                <td>{item.product?._id || item.product}</td>
                                <td>{item.product?.name || item.name}</td>
                                 <td>{item.product?.serialNumber || item.serialNumber || '—'}</td>
                                <td>{item.qty}</td>
                                <td>{item.price.toLocaleString('vi-VN')}₫</td>
                                <td>{(item.qty * item.price).toLocaleString('vi-VN')}₫</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderManagement;
