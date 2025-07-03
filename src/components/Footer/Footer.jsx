import React from 'react';
import { Link } from 'react-router-dom'; // Thêm import này
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Về chúng tôi</h4>
          <p>TL Shop chuyên cung cấp các sản phẩm phụ kiện điện tử chính hãng với chất lượng cao và giá cả hợp lý.</p>
        </div>

        <div className="footer-section">
          <h4>Liên hệ</h4>
          <p>Địa chỉ: Cao Lỗ, Phường 4, Quận 8, TP HCM</p>
          <p>Điện thoại: 0909 999 999</p>
          <p>Email: hotro@phukienso.vn</p>
        </div>

        <div className="footer-section">
          <h4>Hỗ trợ khách hàng</h4>
          <ul>
            <li>
              <Link to="/chinh-sach-bao-hanh">Chính sách bảo hành</Link>
            </li>
            <li>
              <Link to="/chinh-sach-doi-tra">Chính sách đổi trả</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Theo dõi chúng tôi</h4>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/th.luAn17"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a> 
          | 
          <a href="#">Zalo</a> 
          |  
          <a href="#">Instagram</a>
        </div>
            </div>
          </div>

      <div className="footer-bottom">
        © 2025 TL Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
