// pages/Blog/BlogListPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogListPage.css';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Lỗi khi fetch bài viết:', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="blog-list-container">
      <h2 className="blog-list-title">📰 Tin tức công nghệ</h2>
      {posts.length === 0 && <p>Không có bài viết nào.</p>}
      <ul className="blog-title-list">
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/blog/${post._id}`} className="blog-title-link">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogListPage;
