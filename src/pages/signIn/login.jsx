import React, { useState } from "react";
import { loginUser } from "../../services/auth";
import "./login.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setUser }) { // <-- nhận setUser từ App
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      if (setUser) setUser(user); // <-- cập nhật user lên App
      navigate("/"); // Chuyển về trang chủ sau khi đăng nhập
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Đăng nhập</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}