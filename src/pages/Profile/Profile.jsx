// import React, { useEffect, useState } from "react";
// import "./Profile.css";

// const Profile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser && savedUser !== "undefined") {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   if (!user) {
//     return (
//       <div className="profile-container">
//         <h2>Bạn chưa đăng nhập!</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <h2>Thông tin cá nhân</h2>
//       <div className="profile-row">
//         <span className="profile-label">Họ tên:</span>
//         <span>{user.name || user.fullName}</span>
//       </div>
//       <div className="profile-row">
//         <span className="profile-label">Email:</span>
//         <span>{user.email}</span>
//       </div>
//       <div className="profile-row">
//         <span className="profile-label">Mã người dùng:</span>
//         <span>{user._id}</span>
//       </div>
//       {user.isAdmin && (
//         <div className="profile-row">
//           <span className="profile-label">Quyền:</span>
//           <span style={{ color: "red" }}>Quản trị viên</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import "./Profile.css";
import { updateProfile } from "../../services/user"; // Import đúng

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined") {
      const u = JSON.parse(savedUser);
      setUser(u);
      setEditName(u.name || "");
    }
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    if (!editName.trim()) return;
    setLoading(true);
    try {
      const token = user.token;
      const updatedUser = await updateProfile({ name: editName }, token);

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      alert("Cập nhật thất bại!");
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="profile-container">
        <h2>Bạn chưa đăng nhập!</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      <div className="profile-row">
        <span className="profile-label">Họ tên:</span>
        {isEditing ? (
          <>
            <input
              value={editName}
              onChange={e => setEditName(e.target.value)}
              style={{ flex: 1, marginRight: 8 }}
            />
            <button onClick={handleSave} disabled={loading}>
              Lưu
            </button>
            <button onClick={() => setIsEditing(false)} style={{ marginLeft: 4 }}>
              Hủy
            </button>
          </>
        ) : (
          <>
            <span>{user.name || user.fullName}</span>
            <button onClick={handleEdit} style={{ marginLeft: 8 }}>Sửa</button>
          </>
        )}
      </div>
      <div className="profile-row">
        <span className="profile-label">Email:</span>
        <span>{user.email}</span>
      </div>
      <div className="profile-row">
        <span className="profile-label">Mã người dùng:</span>
        <span>{user._id}</span>
      </div>
      {user.isAdmin && (
        <div className="profile-row">
          <span className="profile-label">Quyền:</span>
          <span style={{ color: "red" }}>Quản trị viên</span>
        </div>
      )}
    </div>
  );
};

export default Profile;