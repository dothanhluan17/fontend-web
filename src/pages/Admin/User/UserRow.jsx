import React from "react";

function UserRow({ user, index, onEdit, onDelete }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.isAdmin ? "admin" : "user"}</td>
      <td>
        <button style={{ background: "#28a745", color: "#fff", marginRight: 8 }} onClick={() => onEdit(user)}>
          Sửa
        </button>
        {!user.isAdmin && (
          <button style={{ background: "#dc3545", color: "#fff" }} onClick={onDelete}>
            Xóa
          </button>
        )}
      </td>
    </tr>
  );
}

export default UserRow;