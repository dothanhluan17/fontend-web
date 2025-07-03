import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReturnForm = () => {
  const { orderId, productId } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submitReturn = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
      setError('Bạn cần đăng nhập để gửi yêu cầu hoàn hàng.');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/returns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ orderId, productId, reason })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Gửi yêu cầu thất bại.');
      } else {
        setMessage(data.message || '✅ Gửi yêu cầu hoàn hàng thành công!');
        setReason('');
        setTimeout(() => navigate('/orders'), 2000);
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>📦 Yêu cầu hoàn hàng</h2>
      <p>Đơn hàng: <strong>{orderId}</strong></p>
      <p>Sản phẩm ID: <strong>{productId}</strong></p>

      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Nhập lý do hoàn hàng..."
        rows={5}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <button onClick={submitReturn} style={{ padding: '10px 20px' }}>
        Gửi yêu cầu
      </button>

      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default ReturnForm;
