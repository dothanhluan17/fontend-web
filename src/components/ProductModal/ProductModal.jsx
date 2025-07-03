import React from 'react';

const ProductModal = ({ product, onClose }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#fff', padding: 20, borderRadius: 8,
        width: '90%', maxWidth: 600, textAlign: 'center'
      }}>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: 300, objectFit: 'contain' }} />
        <p><strong>Giá:</strong> {product.price.toLocaleString()}đ</p>

        {product.specs && (
          <>
            <h4>Thông số kỹ thuật:</h4>
            <ul style={{ textAlign: 'left' }}>
              {product.specs.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
          </>
        )}

        <button onClick={onClose} style={{ marginTop: 10 }}>Đóng</button>
      </div>
    </div>
  );
};

export default ProductModal;
