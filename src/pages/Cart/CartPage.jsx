import { useCart } from '../../pages/Cart/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const navigate = useNavigate();
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>🛒 Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Giỏ hàng trống</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div
              key={item.product._id}
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                marginBottom: '16px',
                padding: '16px',
                borderRadius: '10px',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px' }}>{item.product.name}</h3>
                <p style={{ color: '#007bff', fontWeight: 'bold', margin: 0 }}>
                  {item.product.price.toLocaleString()}₫
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <button onClick={() => decreaseQuantity(item.product._id)} style={qtyBtnStyle}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.product._id)} style={qtyBtnStyle}>+</button>
                </div>
                <p style={{ marginTop: '4px' }}>
                  Thành tiền: {(item.product.price * item.quantity).toLocaleString()}₫
                </p>
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  style={{
                    backgroundColor: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={clearCart}
              style={{
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Xóa toàn bộ
            </button>
            <button
              onClick={() => navigate('/checkout')}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const qtyBtnStyle = {
  backgroundColor: '#ddd',
  border: 'none',
  padding: '4px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '18px',
};

export default CartPage;
