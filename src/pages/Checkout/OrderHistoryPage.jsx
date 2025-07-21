// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './OrderHistoryPage.css';

// const OrderHistoryPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [returnRequests, setReturnRequests] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));

//     const fetchOrders = async () => {
//       try {
//         if (user?.token) {
//           const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/myorders`, {
//             headers: {
//               Authorization: `Bearer ${user.token}`,
//               'Content-Type': 'application/json',
//             },
//           });

//           const data = await res.json();
//           if (!res.ok) throw new Error(data.message || 'Lỗi khi lấy đơn hàng');
//           setOrders(data.reverse());
//         } else {
//           const stored = JSON.parse(localStorage.getItem('orderHistory')) || [];
//           setOrders(stored.reverse());
//         }
//       } catch (error) {
//         console.error('Lỗi khi lấy lịch sử đơn hàng:', error.message);
//       }
//     };

//     const fetchReturns = async () => {
//       try {
//         if (user?.token) {
//           const res = await fetch(`${import.meta.env.VITE_API_URL}/returns/my`, {
//             headers: { Authorization: `Bearer ${user.token}` },
//           });
//           const data = await res.json();
//           setReturnRequests(data);
//         }
//       } catch (err) {
//         console.error('Lỗi khi lấy yêu cầu hoàn hàng:', err);
//       }
//     };

//     fetchOrders();
//     fetchReturns();
//   }, []);

//   return (
//     <div className="order-history-container">
//       <h2 className="order-history-title">🗾️ Lịch sử đơn hàng</h2>
//       {orders.length === 0 ? (
//         <p className="no-orders">Chưa có đơn hàng nào.</p>
//       ) : (
//         orders.map((order, index) => (
//           <div key={index} className="order-card">
//             <h3>Đơn hàng #{orders.length - index}</h3>
//             <div className="order-info"><strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString()}</div>
//             <div className="order-info"><strong>Khách hàng:</strong> {order.customerInfo?.name}</div>
//             <div className="order-info"><strong>Email:</strong> {order.customerInfo?.email}</div>
//             <div className="order-info"><strong>Địa chỉ:</strong> {order.shippingAddress?.address}</div>

//             <div className="order-info">
//               <strong>Thanh toán:</strong>{" "}
//               {(order.paymentMethod === "momo" || order.isPaid || order.status === "delivered")
//                 ? "Đã thanh toán"
//                 : "Chưa thanh toán"}
//             </div>

//             <div className="order-info">
//               <strong>Trạng thái đơn hàng:</strong>{" "}
//               <span className={`order-status status-${order.status}`}>
//                 {order.status === 'pending' ? '🕐 Chờ xác nhận'
//                   : order.status === 'confirmed' ? '🚚 Đang giao hàng'
//                   : order.status === 'delivered' ? '✅ Đã giao hàng'
//                   : ''}
//               </span>
//             </div>

//             <ul className="order-items">
//               {(order.orderItems || []).map((item, i) => {
//                 const alreadyReturned = returnRequests.find(r =>
//                   (typeof r.order === 'object' ? r.order._id : r.order) === order._id &&
//                   (typeof r.product === 'object' ? r.product._id : r.product) === item.product
//                 );

//                 return (
//                   <li key={i} className="order-item">
//                     <img src={item.image} alt={item.name} className="item-img" />
//                     <div className="item-details">
//                       <div className="item-name">{item.name}</div>
//                       <div className="item-qty">Số lượng: {item.qty}</div>
//                       <div className="item-price">Đơn giá: {item.price.toLocaleString()}₫</div>
//                       <div className="item-total">
//                         Thành tiền: {(item.price * item.qty).toLocaleString()}₫
//                       </div>

//                       {/* ✅ Nút hoàn hàng cho từng sản phẩm */}
//                       {order.status === 'delivered' &&
//                         new Date() - new Date(order.createdAt) < 7 * 24 * 60 * 60 * 1000 &&
//                         !alreadyReturned && (
//                           <button
//                             className="return-button"
//                             onClick={() => navigate(`/return/${order._id}/${item.product}`)}
//                           >
//                             📦 Yêu cầu hoàn hàng
//                           </button>
//                         )}

//                       {alreadyReturned && (
//                         <p style={{ marginTop: '5px', color: 'green' }}>
//                           ✅ Đã gửi yêu cầu ({alreadyReturned.status})
//                         </p>
//                       )}
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>

//             <p className="total">
//               <strong>Tổng cộng:</strong> {order.totalPrice.toLocaleString()}₫
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default OrderHistoryPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user?.token) {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/myorders`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Lỗi khi lấy đơn hàng');
          setOrders(data.reverse());
        } else {
          const stored = JSON.parse(localStorage.getItem('orderHistory')) || [];
          setOrders(stored.reverse());
        }
      } catch (error) {
        console.error('Lỗi khi lấy lịch sử đơn hàng:', error.message);
      }
    };

    const fetchReturns = async () => {
      try {
        if (user?.token) {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/returns/my`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const data = await res.json();
          setReturnRequests(data);
        }
      } catch (err) {
        console.error('Lỗi khi lấy yêu cầu hoàn hàng:', err);
      }
    };

    fetchOrders();
    fetchReturns();
  }, []);

  const cancelOrder = async (orderId) => {
    if (!window.confirm('Bạn có chắc muốn hủy đơn hàng này không?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Không thể hủy đơn hàng');

      // Cập nhật danh sách
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? { ...order, status: 'cancelled' } : order))
      );

      alert('✅ Đã hủy đơn hàng thành công!');
    } catch (err) {
      console.error('Lỗi khi hủy đơn hàng:', err.message);
      alert('❌ Không thể hủy đơn hàng!');
    }
  };

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">🗾️ Lịch sử đơn hàng</h2>
      {orders.length === 0 ? (
        <p className="no-orders">Chưa có đơn hàng nào.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Đơn hàng #{orders.length - index}</h3>
            <div className="order-info"><strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString()}</div>
            <div className="order-info"><strong>Khách hàng:</strong> {order.customerInfo?.name}</div>
            <div className="order-info"><strong>Email:</strong> {order.customerInfo?.email}</div>
            <div className="order-info"><strong>Địa chỉ:</strong> {order.shippingAddress?.address}</div>

            <div className="order-info">
              <strong>Thanh toán:</strong>{" "}
              {(order.paymentMethod === "momo" || order.isPaid || order.status === "delivered")
                ? "Đã thanh toán"
                : "Chưa thanh toán"}
            </div>

            <div className="order-info">
              <strong>Trạng thái đơn hàng:</strong>{" "}
              <span className={`order-status status-${order.status}`}>
                {order.status === 'pending' ? '🕐 Chờ xác nhận'
                  : order.status === 'confirmed' ? '🚚 Đang giao hàng'
                  : order.status === 'delivered' ? '✅ Đã giao hàng'
                  : order.status === 'cancelled' ? '❌ Đã hủy'
                  : ''}
              </span>
            </div>

            {/* ✅ Nút hủy đơn hàng nếu chưa giao */}
            {(order.status === 'pending' || order.status === 'confirmed') && (
              <button
                className="cancel-button"
                style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}
                onClick={() => cancelOrder(order._id)}
              >
                ❌ Hủy đơn hàng
              </button>
            )}

            <ul className="order-items">
              {(order.orderItems || []).map((item, i) => {
                const alreadyReturned = returnRequests.find(r =>
                  (typeof r.order === 'object' ? r.order._id : r.order) === order._id &&
                  (typeof r.product === 'object' ? r.product._id : r.product) === item.product
                );

                return (
                  <li key={i} className="order-item">
                    <img src={item.image} alt={item.name} className="item-img" />
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-qty">Số lượng: {item.qty}</div>
                      <div className="item-price">Đơn giá: {item.price.toLocaleString()}₫</div>
                      <div className="item-total">
                        Thành tiền: {(item.price * item.qty).toLocaleString()}₫
                      </div>

                      {/* ✅ Nút hoàn hàng */}
                      {order.status === 'delivered' &&
                        new Date() - new Date(order.createdAt) < 7 * 24 * 60 * 60 * 1000 &&
                        !alreadyReturned && (
                          <button
                            className="return-button"
                            onClick={() => navigate(`/return/${order._id}/${item.product}`)}
                          >
                            📦 Yêu cầu hoàn hàng
                          </button>
                        )}

                      {alreadyReturned && (
                        <p style={{ marginTop: '5px', color: 'green' }}>
                          ✅ Đã gửi yêu cầu ({alreadyReturned.status})
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="total">
              <strong>Tổng cộng:</strong> {order.totalPrice.toLocaleString()}₫
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistoryPage;
