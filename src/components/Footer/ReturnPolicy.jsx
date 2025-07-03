import React from 'react';
import './Policy.css';

const ReturnPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Chính sách đổi/trả hàng</h1>
      <p>Chúng tôi hỗ trợ đổi/trả hàng linh hoạt trong các trường hợp sau:</p>

      <ul>
        <li>🔁 Đổi hàng trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng.</li>
        <li>📦 Sản phẩm phải còn nguyên tem, bao bì và chưa qua sử dụng.</li>
        <li>💥 Đổi trả do lỗi kỹ thuật, hỏng hóc từ nhà sản xuất.</li>
        <li>🚫 Không hỗ trợ đổi trả với lý do không chính đáng như: không thích, không hợp.</li>
      </ul>

      <h3>Quy trình đổi trả:</h3>
      <ol>
        <li>📞 Gọi đến hotline hoặc gửi yêu cầu qua email.</li>
        <li>📬 Gửi sản phẩm về địa chỉ của trung tâm đổi trả.</li>
        <li>🔄 Xử lý trong vòng 3 - 5 ngày kể từ khi nhận sản phẩm.</li>
      </ol>

      <p>Chi tiết vui lòng gọi <strong>hotline: 0123 456 789</strong> hoặc gửi email về <strong>support@yourshop.vn</strong>.</p>
    </div>
  );
};

export default ReturnPolicy;
