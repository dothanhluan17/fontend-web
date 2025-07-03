import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/signIn/login';
import Products from './pages/Products/Products';
import Contact from "./pages/Contact/Contact";
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import ConfirmationPage from './pages/Checkout/ConfirmationPage';
import OrderHistoryPage from "./pages/Checkout/OrderHistoryPage";
import Profile from './pages/Profile/Profile';
import Admin from "./pages/Admin/Admin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './pages/Cart/CartContext';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import WarrantyPolicy from './components/Footer/WarrantyPolicy';
import ReturnPolicy from './components/Footer/ReturnPolicy';
import ReturnForm from './components/ReturnForm/ReturnForm';
import ReturnStatus from './pages/ReturnStatus/ReturnStatus';
import BlogCreatePage from './pages/Admin/AdminBlog/BlogCreatePage';
import BlogDetailPage from './pages/Blog/BlogDetailPage';
import BlogListPage from './pages/Blog/BlogListPage';
import AdminContactPage from './pages/Admin/AdminContactPage/AdminContactPage';
import CustomerChat from './components/Chat/CustomerChat';
import ChatWidget from './components/Chat/ChatWidget';
import AdminChatPage from './pages/Admin/AdminChat/AdminChatPage';

 // Đúng đường dẫn CartContext

function AppContent({ setUser }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/chinh-sach-bao-hanh" element={<WarrantyPolicy />} />
        <Route path="/chinh-sach-doi-tra" element={<ReturnPolicy />} />
        <Route path="/return/:orderId/:productId" element={<ReturnForm />} />
        <Route path="/my-returns" element={<ReturnStatus />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/admin/blog/create" element={<BlogCreatePage />} />
      </Routes>
      {!isAdminPage && <ChatWidget />}
      {!isAdminPage && <Footer />}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

function App() {
  // Quản lý user bằng state
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Khi đăng nhập hoặc đăng xuất, cập nhật user vào localStorage và state
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <Router>
      <CartProvider >
        <AppContent setUser={setUser} />
      </CartProvider>
    </Router>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/Footer';
// import Home from './pages/Home/Home';
// import Login from './pages/signIn/login';
// import Products from './pages/Products/Products';
// import Contact from './pages/Contact/Contact';
// import CartPage from './pages/Cart/CartPage';
// import CheckoutPage from './pages/Checkout/CheckoutPage';
// import ConfirmationPage from './pages/Checkout/ConfirmationPage';
// import OrderHistoryPage from './pages/Checkout/OrderHistoryPage';
// import Profile from './pages/Profile/Profile';
// import Admin from './pages/Admin/Admin';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { CartProvider } from './pages/Cart/CartContext'; // ✅ Import đúng CartProvider

// function AppContent({ setUser }) {
//   const location = useLocation();
//   const isAdminPage = location.pathname.startsWith('/admin');

//   return (
//     <>
//       {!isAdminPage && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login setUser={setUser} />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/checkout" element={<CheckoutPage />} />
//         <Route path="/confirmation" element={<ConfirmationPage />} />
//         <Route path="/order-history" element={<OrderHistoryPage />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/admin/*" element={<Admin />} />
//       </Routes>
//       {!isAdminPage && <Footer />}
//       <ToastContainer position="top-right" autoClose={2000} />
//     </>
//   );
// }

// function App() {
//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem('user');
//     return stored ? JSON.parse(stored) : null;
//   });

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user');
//     }
//   }, [user]);

//   return (
//     <Router>
//       <CartProvider> 
//         <AppContent setUser={setUser} />
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;
