import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Cart from '../pages/Cart/Cart';
import Products from '../pages/Products/Products';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Profile from '../pages/Profile/Profile'; // Thêm dòng này

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} /> {/* Thêm dòng này */}
        {/* Có thể thêm route 404 ở đây nếu muốn */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
