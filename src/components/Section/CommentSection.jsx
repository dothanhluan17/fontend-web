import React, { useState } from 'react';
import './CommentSection.css';

const CommentSection = ({ postId, comments = [] }) => {
  const [content, setContent] = useState('');
  const [localComments, setLocalComments] = useState(comments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert('Bạn phải đăng nhập để bình luận.');

    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      const data = await res.json();
      setLocalComments([data.comment, ...localComments]);
      setContent('');
    } else {
      alert('Không thể gửi bình luận');
    }
  };

  return (
    <div className="comment-section">
      <h4 className="comment-title">💬 Bình luận</h4>

      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          rows="3"
          placeholder="Viết bình luận..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Gửi</button>
      </form>

      <div className="comment-list">
        {localComments.length === 0 && <p>Chưa có bình luận nào.</p>}
        {localComments.map((cmt, index) => (
          <div key={index} className="comment-item">
            <div className="comment-user">
              <strong>{cmt.user?.name || 'Ẩn danh'}</strong>{' '}
              <span className="comment-date">
                {new Date(cmt.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="comment-content">{cmt.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
