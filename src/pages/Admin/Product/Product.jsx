import React, { useState, useEffect } from 'react';
import './Product.css';

const Product = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    countInStock: '',
    specs: [{ label: '', value: '' }],
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const fetchProducts = () => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...product.specs];
    newSpecs[index][field] = value;
    setProduct(prev => ({ ...prev, specs: newSpecs }));
  };

  const addSpec = () => {
    setProduct(prev => ({ ...prev, specs: [...prev.specs, { label: '', value: '' }] }));
  };

  const removeSpec = (index) => {
    const newSpecs = product.specs.filter((_, i) => i !== index);
    setProduct(prev => ({ ...prev, specs: newSpecs }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res, data;
      if (editId) {
        res = await fetch(`${import.meta.env.VITE_API_URL}/products/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || "Cập nhật sản phẩm thất bại");
        alert('Đã cập nhật sản phẩm!');
      } else {
        res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || "Thêm sản phẩm thất bại");
        alert('Đã thêm sản phẩm!');
      }
      setProduct({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        countInStock: '',
        specs: [{ label: '', value: '' }],
      });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (prod) => {
    setProduct({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      image: prod.image,
      category: prod.category,
      countInStock: prod.countInStock,
      specs: prod.specs || [{ label: '', value: '' }],
    });
    setEditId(prod._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setProduct({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      countInStock: '',
      specs: [{ label: '', value: '' }],
    });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Xóa thất bại");
      setProducts(products.filter(p => p._id !== id));
      if (editId === id) handleCancelEdit();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="product-container">
      <h2>{editId ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <label>
          Tên sản phẩm
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Nhập tên sản phẩm"
            required
          />
        </label>

        <label>
          Danh mục sản phẩm
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </label>

        <label>
          Mô tả
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Mô tả sản phẩm"
            rows={4}
            required
          />
        </label>

        <label>
          Giá (VNĐ)
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Nhập giá sản phẩm"
            min="0"
            required
          />
        </label>

        <label>
          Link ảnh
          <input
            type="url"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </label>

        <label>
          Số lượng trong kho
          <input
            type="number"
            name="countInStock"
            value={product.countInStock}
            onChange={handleChange}
            placeholder="Nhập số lượng"
            min="0"
          />
        </label>

        <div className="spec-section">
          <h4>Thông số kỹ thuật</h4>
          {product.specs.map((spec, index) => (
            <div key={index} className="spec-item">
              <input
                type="text"
                placeholder="Tên thông số (VD: RAM)"
                value={spec.label}
                onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
              />
              <input
                type="text"
                placeholder="Giá trị (VD: 8GB)"
                value={spec.value}
                onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
              />
              <button type="button" onClick={() => removeSpec(index)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={addSpec}>➕ Thêm dòng</button>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit">{editId ? "Cập nhật" : "Thêm sản phẩm"}</button>
          {editId && (
            <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: "#6c757d" }}>
              Hủy
            </button>
          )}
        </div>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <h3>Danh sách sản phẩm</h3>
      {products.length === 0 && <p>Chưa có sản phẩm nào.</p>}

      <div className="product-list">
        {products.map((p, index) => (
          <div className="product-card" key={p._id || index}>
            <img src={p.image} alt={p.name} className="product-image" />
            <div className="product-info">
              <h4>{p.name}</h4>
              <p><strong>Danh mục:</strong> {categories.find(c => c._id === p.category)?.name || 'Không xác định'}</p>
              <p><strong>Giá:</strong> {p.price} VNĐ</p>
              <p><strong>Số lượng:</strong> {p.countInStock || 0}</p>
              <p>{p.description}</p>
              <button onClick={() => handleEdit(p)} style={{ marginRight: 8 }}>Sửa</button>
              <button onClick={() => handleDelete(p._id)} style={{ background: "#dc3545", color: "#fff" }}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
