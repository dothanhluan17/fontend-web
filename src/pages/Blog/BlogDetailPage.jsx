import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../../components/Section/CommentSection';
import './BlogDetailPage.css'; 

const BlogDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <p className="blog-loading">Đang tải bài viết...</p>;

  return (
    <div className="blog-detail-container">
      <h2 className="blog-detail-title">{post.title}</h2>
      <p className="blog-detail-meta">
        Đăng lúc: {new Date(post.createdAt).toLocaleString()}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="blog-detail-image"
        />
      )}

      <div className="blog-detail-content">{post.content}</div>

      <hr className="divider" />
      <CommentSection postId={post._id} comments={post.comments} />
    </div>
  );
};

export default BlogDetailPage;
