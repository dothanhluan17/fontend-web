import React from 'react';
import { useCart } from '../../pages/Cart/CartContext';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // tránh click bubbling khi bấm nút
    addToCart(product);
    toast.success(`✅ Đã thêm "${product.name}" vào giỏ hàng!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-info">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price.toLocaleString()} ₫</p>
      </Link>
      <div className="product-actions">
        <button onClick={handleAddToCart}>
          <FaShoppingCart /> Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
