import React, { useEffect, useState } from 'react';
import './ReturnStatus.css';

const ReturnStatus = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchReturns = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch(`${import.meta.env.VITE_API_URL}/returns/my`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setRequests(data);
    };

    fetchReturns();
  }, []);

  return (
    <div className="return-status-container">
      <h2>📦 Trạng thái hoàn hàng của bạn</h2>
      {requests.length === 0 ? (
        <p>Chưa có yêu cầu hoàn hàng nào.</p>
      ) : (
        <table className="return-status-table">
          <thead>
            <tr>
              <th>Đơn hàng</th>
              <th>Lý do</th>
              <th>Ngày gửi</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <td>{r.order?._id || 'N/A'}</td>
                <td>{r.reason}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td className={
                  r.status === 'pending' ? 'status-pending'
                  : r.status === 'approved' ? 'status-approved'
                  : 'status-rejected'
                }>
                  {r.status === 'pending' && '⏳ Chờ xử lý'}
                  {r.status === 'approved' && '✅ Đã duyệt'}
                  {r.status === 'rejected' && '❌ Từ chối'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReturnStatus;
