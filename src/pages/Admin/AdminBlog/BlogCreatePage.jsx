import React, { useState, useEffect } from 'react';
import './BlogCreatePage.css';

const BlogCreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [posts, setPosts] = useState([]);

  // Lấy danh sách bài viết khi load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error('❌ Dữ liệu không hợp lệ:', data);
        }
      } catch (err) {
        console.error('❌ Lỗi khi fetch bài viết:', err);
      }
    };
    fetchPosts();
  }, []);

  // Submit đăng bài mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert('Bạn chưa đăng nhập');

    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title, content, image }),
    });

    if (res.ok) {
      const newPost = await res.json();
      alert('✅ Đăng bài thành công!');
      setTitle('');
      setContent('');
      setImage('');
      setPosts([newPost, ...posts]);
    } else {
      alert('❌ Có lỗi xảy ra!');
    }
  };

  // Xoá bài viết
  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert('Bạn chưa đăng nhập');
    if (!window.confirm('Bạn chắc chắn muốn xoá bài này?')) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (res.ok) {
      setPosts(posts.filter((post) => post._id !== id));
      alert('🗑️ Đã xoá bài viết');
    } else {
      alert('❌ Không thể xoá bài viết');
    }
  };

  return (
    <div className="blog-create-container">
      <h2 className="blog-create-title">📝 Đăng bài viết mới</h2>
      <form onSubmit={handleSubmit} className="blog-create-form">
        <label>Tiêu đề</label>
        <input
          type="text"
          placeholder="Tiêu đề bài viết"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Ảnh (URL)</label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label>Nội dung</label>
        <textarea
          rows="8"
          placeholder="Nội dung bài viết"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Đăng bài</button>
      </form>

      <hr style={{ margin: '40px 0' }} />
      <h3>Bài viết đã đăng</h3>

      {posts.length === 0 && <p>Chưa có bài viết nào.</p>}

      {posts.map((post) => (
        <div key={post._id} className="blog-preview">
          <h4>{post.title}</h4>
          {post.image && (
            <img
              src={post.image}
              alt="preview"
              style={{ maxWidth: '100%', height: 'auto', margin: '10px 0' }}
            />
          )}
          <p>{post.content.slice(0, 200)}...</p>
          <button
            onClick={() => handleDelete(post._id)}
            style={{
              marginTop: '10px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Xoá bài
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogCreatePage;
