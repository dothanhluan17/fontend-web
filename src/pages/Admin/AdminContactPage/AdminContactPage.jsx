import React, { useEffect, useState } from 'react';
import './AdminContactPage.css';

const AdminContactPage = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');


  const token = JSON.parse(localStorage.getItem('user'))?.token;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/contact/admin', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Lỗi khi tải tin nhắn');
        }

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMessages();
  }, [token]);

  return (
    <div className="admin-contact-container">
      <h2>📩 Liên hệ từ khách hàng</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="message-list">
        {messages.length === 0 ? (
          <p>Không có liên hệ nào.</p>
        ) : (
          messages.map((msg) => (
            <div className="message-card" key={msg._id}>
              <p><strong>👤 Họ tên:</strong> {msg.name}</p>
              <p><strong>📧 Email:</strong> {msg.email}</p>
              <p><strong>📝 Nội dung:</strong> {msg.message}</p>
              <p className="timestamp">
                🕒 {new Date(msg.createdAt).toLocaleString('vi-VN')}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminContactPage;
