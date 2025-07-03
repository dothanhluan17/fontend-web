import React, { useEffect, useState } from 'react';
import './AdminReturnRequests.css';

const AdminReturnRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch(`${import.meta.env.VITE_API_URL}/returns`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const handleUpdate = async (id, status) => {
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch(`${import.meta.env.VITE_API_URL}/returns/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status }),
    });

    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="return-requests-container">
      <h2>📦 Yêu cầu hoàn hàng</h2>
      {requests.length === 0 ? (
        <p>Không có yêu cầu nào.</p>
      ) : (
        <table className="return-requests-table">
          <thead>
            <tr>
              <th>Khách</th>
              <th>Email</th>
              <th>Đơn hàng</th>
              <th>Sản phẩm</th>
              <th>Lý do</th>
              <th>Ngày gửi</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <td>{r.user?.name}</td>
                <td>{r.user?.email}</td>
                <td>{r.order?._id}</td>
                <td>{r.product?.name || r.product}</td>
                <td>{r.reason}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>
                  <span
                    className={
                      r.status === 'pending'
                        ? 'return-status status-pending'
                        : r.status === 'approved'
                        ? 'return-status status-approved'
                        : 'return-status status-rejected'
                    }
                  >
                    {r.status === 'pending' && '⏳ Chờ xử lý'}
                    {r.status === 'approved' && '✅ Đã duyệt'}
                    {r.status === 'rejected' && '❌ Từ chối'}
                  </span>
                </td>
                <td>
                  {r.status === 'pending' && (
                    <>
                      <button className="btn btn-approve" onClick={() => handleUpdate(r._id, 'approved')}>
                        Duyệt
                      </button>
                      <button className="btn btn-reject" onClick={() => handleUpdate(r._id, 'rejected')}>
                        Từ chối
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReturnRequests;
