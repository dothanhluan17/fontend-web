import React, { useEffect, useState } from 'react';
import './User.css';
import UserRow from './UserRow';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Không thể lấy danh sách user");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setUsers([]);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [token]);

  const handleEdit = (user) => {
    console.log("Edit user", user);
  };

  const handleDelete = async (userId, isAdmin) => {
    if (isAdmin) {
      alert("Không thể xóa tài khoản admin!");
      return;
    }
    if (!window.confirm("Bạn có chắc chắn muốn xóa user này?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
      alert("Xóa thất bại!");
    }
  };

  return (
    <div className="users-container">
      <h2>Danh sách người dùng</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Quyền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserRow
                key={user._id}
                user={user}
                index={index}
                onEdit={handleEdit}
                onDelete={() => handleDelete(user._id, user.isAdmin)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;