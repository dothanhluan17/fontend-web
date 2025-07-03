import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { useCart } from '../../pages/Cart/CartContext';
import './ProductDetail.css';

Modal.setAppElement('#root');

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSpecs, setShowSpecs] = useState(true);
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')));
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reviews/product/${id}`)
      .then((res) => res.json())
      .then(setReviews)
      .catch(console.error);
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!user) return toast.error('Bạn cần đăng nhập để đánh giá');
    if (!commentText.trim()) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ productId: id, rating, comment: commentText }),
    });

    if (res.ok) {
      const newReview = await res.json();
      setReviews((prev) => [...prev, newReview]);
      setCommentText('');
      setRating(5);
      toast.success('✅ Đã gửi đánh giá');
    } else {
      const err = await res.json();
      toast.error(err.message || 'Lỗi khi gửi đánh giá');
    }
  };

  if (!product) return <p>Đang tải sản phẩm...</p>;

  return (
    <div className="product-detail-wrapper">
      {/* Phần hình và thông tin sản phẩm */}
      <div className="product-top-section">
        <div className="product-image-section">
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price.toLocaleString()} ₫</p>
          <p className="product-description">{product.description}</p>

          <div className="product-quantity">
            <label>Số lượng:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <button
            className="add-to-cart-button"
            onClick={() => {
              addToCart(product, quantity);
              toast.success('✅ Đã thêm vào giỏ hàng!');
            }}
          >
            <p style={{ fontSize: '18px', color: 'yellow' }}>🛒 Thêm vào giỏ</p>
          </button>
        </div>
      </div>

      {/* Thông số kỹ thuật */}
      {product.specs?.length > 0 && (
        <div className="product-specs-wrapper">
          <button
            onClick={() => setShowSpecs((prev) => !prev)}
            className="toggle-specs-button"
          >
            {showSpecs ? 'Ẩn thông số kỹ thuật ▲' : 'Hiện thông số kỹ thuật ▼'}
          </button>

          {showSpecs && (
            <div className="product-specs">
              <h3>Thông số kỹ thuật</h3>
              <table className="specs-table">
                <tbody>
                  {product.specs.map((spec, index) => (
                    <tr key={index}>
                      <td><strong>{spec.label}</strong></td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Đánh giá sản phẩm */}
      <div className="product-comments">
        <h3>Đánh giá sản phẩm</h3>
        {reviews.length === 0 ? (
          <p>Chưa có đánh giá nào</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="comment-item">
              <strong>{r.user?.name || 'Ẩn danh'}</strong> - {r.rating}⭐
              <div>{r.comment}</div>
            </div>
          ))
        )}

        <div className="comment-form">
          <h4>Gửi đánh giá của bạn</h4>
          <label>
            Số sao:
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} ⭐</option>
              ))}
            </select>
          </label>
          <textarea
            rows="3"
            placeholder="Viết nhận xét của bạn..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="submit-comment-btn" onClick={handleCommentSubmit}>
            Gửi đánh giá
          </button>
        </div>
      </div>

      {/* Modal xem ảnh lớn */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setRotation(0);
        }}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div style={{ textAlign: 'center' }}>
          <img
            src={product.image}
            alt="product"
            style={{
              maxWidth: '90%',
              maxHeight: '80vh',
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease',
            }}
          />
          <div style={{ marginTop: '16px' }}>
            <button onClick={() => setRotation((r) => r - 90)} className="rotate-button">⟲ Xoay trái</button>
            <button onClick={() => setRotation((r) => r + 90)} className="rotate-button">⟳ Xoay phải</button>
          </div>
          <button onClick={() => setIsModalOpen(false)} className="close-modal">Đóng</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;
