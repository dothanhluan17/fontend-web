import React, { useState, useEffect } from 'react';
import './Auth.css';

const apiUrl = import.meta.env.VITE_API_URL;

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const toggleForm = () => {
    setError('');
    setIsLogin(!isLogin);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // ✅ Đăng nhập
      try {
        const res = await fetch(`${apiUrl}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(data));
          alert('Đăng nhập thành công!');
          setError('');
          onClose();
        } else {
          setError(data.message || 'Email hoặc mật khẩu không đúng!');
        }
      } catch (err) {
        setError('Lỗi kết nối server!');
      }
    } else {
      // ✅ Đăng ký
      try {
        const res = await fetch(`${apiUrl}/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name, // ✅ Dùng đúng key
            email: form.email,
            password: form.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          alert('Đăng ký thành công!');
          setForm({ name: '', email: form.email, password: form.password });
          setError('');
          setIsLogin(true); // chuyển sang form login
        } else {
          setError(data.message || 'Đăng ký thất bại!');
        }
      } catch (err) {
        setError('Lỗi kết nối server!');
      }
    }
  };

  useEffect(() => {
    setForm({ name: '', email: '', password: '' });
    setError('');
  }, [isLogin]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Họ tên</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</button>
        </form>
        <p className="toggle-link" onClick={toggleForm}>
          {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
