import React, { useEffect, useState, useRef } from 'react';
import { useCart } from './../../pages/Cart/CartContext';
import { toast } from 'react-toastify';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BannerCarousel from '../../components/BannerCarousel';
import { Link } from 'react-router-dom'; // ✅ thêm Link

import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Lỗi khi fetch sản phẩm:', error);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="home-container px-4 overflow-x-hidden">
      <div className="home-banner-section max-w-screen-xl mx-auto w-full mb-8">
        <BannerCarousel />
      </div>

      <div className="product-section bg-white p-4 rounded-lg shadow-md max-w-screen-xl mx-auto">
        <h2 className="tab-title">SẢN PHẨM</h2>

        <div className="product-scroll-wrapper">
          <button className="arrow-button arrow-left" onClick={scrollLeft}>
            <ChevronLeft size={20} />
          </button>

          <div className="product-scroll-container" ref={scrollRef}>
            {products.map((product) => (
              <div key={product._id} className="product-item">
                {/* ✅ Bọc nội dung trong Link */}
                <Link to={`/products/${product._id}`} className="product-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img
                    src={product.image || '/placeholder.png'}
                    alt={product.name}
                    className="product-img"
                  />
                  <h3>{product.name}</h3>
                  <p>{product.price?.toLocaleString()} đ</p>
                </Link>
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success('✅ Đã thêm vào giỏ hàng!');
                  }}
                  className="add-to-cart-btn"
                >
                  🛒 THÊM VÀO GIỎ
                </button>
              </div>
            ))}
          </div>

          <button className="arrow-button arrow-right" onClick={scrollRight}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
