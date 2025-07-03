import React, { useState } from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(null); // Để hiển thị thông báo

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Không thể gửi. Vui lòng thử lại.' });
    }
  };

  return (
    <div className="contact-page">
      <h2>Liên hệ với chúng tôi</h2>
      <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn.</p>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Thông tin liên hệ</h3>
          <ul>
            <li><FaMapMarkerAlt /> 180 Cao Lỗ, Phường 4, Quận 8, TP.HCM (STU)</li>
            <li><FaPhone /> 028 3850 5520</li>
            <li><FaEnvelope /> contact@stu.edu.vn</li>
          </ul>

          <div className="map-container">
            <iframe
              title="STU Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.881530137796!2d106.67798221462276!3d10.74653979234556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec5735e94b5%3A0x9bb1170e13890fa3!2zMTgwIENhbyBM4buTLCBQaMaw4budbmcgNCwgUXXhuq1uIDgsIFRow6BuaCBwaOG7kSBHw6AgVMOibiBNaW4!5e0!3m2!1svi!2s!4v1655379826622!5m2!1svi!2s"
              width="100%"
              height="250"
              style={{ border: 0, marginTop: '1rem' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Gửi tin nhắn</h3>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email của bạn"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Nội dung tin nhắn..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Gửi</button>

          {/* Thông báo kết quả */}
          {status && (
            <p className={status.type === 'success' ? 'success-msg' : 'error-msg'}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
