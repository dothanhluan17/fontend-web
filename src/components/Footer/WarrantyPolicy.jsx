import React from 'react';
import './Policy.css';

const WarrantyPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Chính sách bảo hành</h1>
      <p>Chúng tôi cam kết cung cấp sản phẩm chính hãng và chất lượng. Tất cả sản phẩm được bảo hành theo điều kiện sau:</p>

      <ul>
        <li>✔️ Thời gian bảo hành: 12 tháng kể từ ngày mua hàng.</li>
        <li>✔️ Bảo hành theo điều kiện của nhà sản xuất.</li>
        <li>✔️ Sản phẩm phải còn nguyên tem, phiếu bảo hành hoặc hóa đơn mua hàng.</li>
        <li>✔️ Không bảo hành nếu sản phẩm bị rơi vỡ, vào nước hoặc can thiệp sửa chữa bên ngoài.</li>
      </ul>

      <h3>Quy trình bảo hành:</h3>
      <ol>
        <li>1️⃣ Liên hệ bộ phận CSKH qua hotline hoặc email.</li>
        <li>2️⃣ Gửi sản phẩm về trung tâm bảo hành theo hướng dẫn.</li>
        <li>3️⃣ Thời gian xử lý từ 3 - 7 ngày làm việc.</li>
      </ol>

      <p>Mọi thắc mắc vui lòng liên hệ <strong>hotline: 0123 456 789</strong> để được hỗ trợ nhanh chóng.</p>
    </div>
  );
};

export default WarrantyPolicy;
