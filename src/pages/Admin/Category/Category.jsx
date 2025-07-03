import React, { useEffect, useState } from "react";
import "./Category.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ name: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setCategories([]);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.name.trim()) return;
    try {
      let res, data;
      if (editId) {
        res = await fetch(`${import.meta.env.VITE_API_URL}/categories/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: category.name }),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || "Cập nhật thất bại");
        setCategories(categories.map((c) => (c._id === editId ? data : c)));
      } else {
        res = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: category.name }),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || "Thêm thất bại");
        setCategories([...categories, data]);
      }
      setCategory({ name: "" });
      setEditId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (cat) => {
    setCategory({ name: cat.name });
    setEditId(cat._id);
  };

  const handleCancelEdit = () => {
    setCategory({ name: "" });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Xóa thất bại");
      setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="category-container">
      
      <h2>{editId ? "Sửa Danh Mục" : "Thêm Danh Mục Mới"}</h2>
      <form className="category-form" onSubmit={handleSubmit}>
        <label>
          Tên danh mục <span style={{ color: "red" }}>*</span>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            placeholder="Nhập tên danh mục"
            required
          />
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit">{editId ? "Cập nhật" : "Thêm danh mục"}</button>
          {editId && (
            <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: "#6c757d" }}>
              Hủy
            </button>
          )}
        </div>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>Danh sách danh mục</h3>
      {loading ? (
        <p>Đang tải...</p>
      ) : categories.length === 0 ? (
        <p>Chưa có danh mục nào.</p>
      ) : (
        <ul className="category-list">
          {categories.map((c, i) => (
            <li key={c._id} className="category-item">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong>{c.name}</strong>
                <div>
                  <button className="btn-edit" onClick={() => handleEdit(c)} title="Sửa danh mục">
                    ✏️
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(c._id)} title="Xóa danh mục">
                    🗑️
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Category;