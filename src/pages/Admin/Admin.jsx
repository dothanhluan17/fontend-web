import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Outlet,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import User from "./User/User";
import Product from "./Product/Product";
import Category from "./Category/Category";
import OrderManagement from "./OrderManagement/OrderManagement";
import AdminReturnRequests from "./AdminReturnRequests/AdminReturnRequests"; // ✅ Import component quản lý hoàn hàng
import BlogCreatePage from "./AdminBlog/BlogCreatePage";
import "./Admin.css";
import AdminContactPage from "./AdminContactPage/AdminContactPage";
import AdminChatPage from "./AdminChat/AdminChatPage";


const AdminLayout = () => (
  <div className="admin-container">
    <aside className="sidebar">
      <h2 className="logo">Admin</h2>
      <nav>
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/users">Tài Khoản Khách Hàng</Link></li>
          <li><Link to="/admin/products">Sản Phẩm</Link></li>
          <li><Link to="/admin/categories">Danh Mục</Link></li>
          <li><Link to="/admin/orders">Quản Lý Đơn Hàng</Link></li>
          <li><Link to="/admin/returns">Yêu Cầu Hoàn Hàng</Link></li>
          <li><Link to="/admin/blog">Tin Tức</Link></li> 
          <li><Link to="/admin/messages">Liên Hệ</Link></li> 
          <li><Link to="/admin/chat">Chat</Link></li> 
        </ul>
      </nav>
    </aside>
    <div className="main">
      <header className="header">
        <h1>Admin</h1>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  </div>
);

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(savedUser);
    if (!user.isAdmin) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<User />} />
        <Route path="products" element={<Product />} />
        <Route path="categories" element={<Category />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="returns" element={<AdminReturnRequests />} />
        <Route path="blog" element={<BlogCreatePage />} /> {/* ✅ Thêm route quản lý hoàn hàng */}
        <Route path="messages" element={<AdminContactPage />} />
        <Route path="chat" element={<AdminChatPage />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Route>
    </Routes>
  );
};

export default Admin;
