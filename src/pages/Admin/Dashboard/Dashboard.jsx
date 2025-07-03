import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
  });

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const overviewRes = await fetch(`${import.meta.env.VITE_API_URL}/stats/overview`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const overviewData = await overviewRes.json();

        const revenueRes = await fetch(`${import.meta.env.VITE_API_URL}/stats/revenue-by-month`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const revenueData = await revenueRes.json();

        setStats(overviewData);
        setMonthlyRevenue(revenueData);
      } catch (err) {
        console.error('Lỗi khi lấy thống kê:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h2>Thống kê tổng quan</h2>
      <div className="stats-grid">
        <div className="card">
          <h4>Tổng doanh thu</h4>
          <p>{stats.totalRevenue.toLocaleString()} VNĐ</p>
        </div>
        <div className="card">
          <h4>Tổng đơn hàng</h4>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="card">
          <h4>Tổng người dùng</h4>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="card">
          <h4>Tổng sản phẩm</h4>
          <p>{stats.totalProducts}</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Biểu đồ doanh thu theo tháng</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickFormatter={m => `Tháng ${m}`} />
            <YAxis tickFormatter={v => `${(v / 1e6).toFixed(1)}tr`} />
            <Tooltip formatter={(value) => `${value.toLocaleString()} VNĐ`} />
            <Bar dataKey="total" fill="#2c3e50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
