import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './pages/Cart/CartContext.jsx';
 // ✅ Import provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> {/* ✅ Phải có dòng này */}
      <App />
    </CartProvider>
  </StrictMode>
);
