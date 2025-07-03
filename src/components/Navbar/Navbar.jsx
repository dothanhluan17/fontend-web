import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from "../AuthModal";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    try {
      if (savedUser && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
        if (savedUser === "undefined") localStorage.removeItem("user");
      }
    } catch {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, [showModal]);

  useEffect(() => {
    // Đóng dropdown khi click ra ngoài
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchText.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">TL Shop</div>
          <ul className="nav-links">
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
            <li><Link to="/blog">Tin tức</Link></li>
          </ul>
        </div>

        <div className="navbar-center">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </div>

        <div className="navbar-right">
          <Link to="/cart" className="nav-icon">🛒 Giỏ hàng</Link>
          {user ? (
            <div className="nav-user-dropdown" ref={dropdownRef}>
              <span
                className="nav-user"
                onClick={() => setShowDropdown((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                Xin chào, {user.name || user.fullName}
              </span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    Trang cá nhân
                  </Link>
                  <Link to="/order-history" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    Lịch sử đơn hàng
                  </Link>
                  <Link to="/my-returns" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    Trạng thái hoàn hàng
                  </Link>

                  <span className="dropdown-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          ) : (
            <span className="nav-auth" onClick={() => setShowModal(true)}>
              Đăng nhập / Đăng ký
            </span>
          )}
        </div>
      </nav>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;