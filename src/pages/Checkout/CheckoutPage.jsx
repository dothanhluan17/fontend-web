// import React, { useState } from 'react';
// import { useCart } from '../Cart/CartContext';
// import { useNavigate } from 'react-router-dom';
// import './CheckoutPage.css';

// const CheckoutPage = () => {
//   const { cartItems, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     address: '',
//     paymentMethod: 'credit_card',
//   });

//   const total = cartItems.reduce((sum, item) => {
//     const price = Number(item?.product?.price || 0);
//     const quantity = Number(item?.quantity || 0);
//     return sum + price * quantity;
//   }, 0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.address) {
//       alert("Vui lòng nhập đầy đủ thông tin.");
//       return;
//     }

//     const validItems = cartItems.filter(item => item.product && item.product._id);
//     if (validItems.length === 0) {
//       alert("Giỏ hàng không hợp lệ.");
//       return;
//     }

//     const orderData = {
//       customerInfo: {
//         name: form.name,
//         email: form.email,
//         phone: '',
//       },
//       orderItems: validItems.map(item => ({
//         product: item.product._id,
//         name: item.product.name,
//         image: item.product.image,
//         price: Number(item.product.price),
//         qty: Number(item.quantity),
//       })),
//       paymentMethod: form.paymentMethod,
//       shippingAddress: {
//         address: form.address,
//         city: '',
//         postalCode: '',
//         country: '',
//       },
//       totalPrice: total,
//     };

//     // ✅ Lấy token từ localStorage nếu có
//     const user = JSON.parse(localStorage.getItem('user'));
//     const token = user?.access_token || user?.token;

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }), // Gửi token nếu có
//         },
//         body: JSON.stringify(orderData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         console.error('Lỗi khi đặt hàng:', data);
//         throw new Error(data.message || "Đặt hàng thất bại");
//       }

//       clearCart();
//           navigate('/confirmation', {
//           state: {
//           customerInfo: form,
//           cartItems: validItems.map(item => ({
//           name: item.product.name,
//           image: item.product.image,
//           price: Number(item.product.price),
//           quantity: Number(item.quantity),
//         })),
//         totalPrice: total,
//       },
//     });
//     } catch (err) {
//       alert(`❌ ${err.message}`);
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <h2>Thanh toán</h2>
//       <form onSubmit={handleSubmit} className="checkout-form">
//         <label>
//           Họ tên:
//           <input type="text" name="name" value={form.name} onChange={handleChange} required />
//         </label>
//         <label>
//           Email:
//           <input type="email" name="email" value={form.email} onChange={handleChange} required />
//         </label>
//         <label>
//           Địa chỉ:
//           <textarea name="address" value={form.address} onChange={handleChange} required />
//         </label>
//         <label>
//           Phương thức thanh toán:
//           <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
//             <option value="credit_card">Thẻ tín dụng</option>
//             <option value="cash_on_delivery">Thanh toán khi nhận hàng</option>
//             <option value="bank_transfer">Chuyển khoản</option>
//           </select>
//         </label>

//         <div className="checkout-summary">
//           <h3>Giỏ hàng</h3>
//           {cartItems.length === 0 ? (
//             <p>Không có sản phẩm trong giỏ hàng.</p>
//           ) : (
//             <ul>
//               {cartItems.map((item, index) => {
//                 const price = Number(item?.product?.price || 0);
//                 const quantity = Number(item?.quantity || 0);
//                 const name = item?.product?.name || 'Không rõ';
//                 return (
//                   <li key={index}>
//                     {name} x {quantity} = {(price * quantity).toLocaleString()}₫
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//           <p className="total-price">Tổng cộng: {total.toLocaleString()}₫</p>
//         </div>

//         <button type="submit" className="submit-button">Đặt hàng</button>
//       </form>
//     </div>
//   );
// };

// export default CheckoutPage;
import React, { useState } from 'react';
import { useCart } from '../Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'zalopay',
  });

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item?.product?.price || 0);
    const quantity = Number(item?.quantity || 0);
    return sum + price * quantity;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const validItems = cartItems.filter(item => item.product && item.product._id);
    if (validItems.length === 0) {
      alert("Giỏ hàng không hợp lệ.");
      return;
    }

    const orderData = {
      customerInfo: {
        name: form.name,
        email: form.email,
        phone: '',
      },
      orderItems: validItems.map(item => ({
        product: item.product._id,
        name: item.product.name,
        image: item.product.image,
        price: Number(item.product.price),
        qty: Number(item.quantity),
      })),
      paymentMethod: form.paymentMethod,
      shippingAddress: {
        address: form.address,
        city: '',
        postalCode: '',
        country: '',
      },
      totalPrice: total,
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.access_token || user?.token;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(orderData),
      });

      const order = await res.json();

      if (!res.ok) {
        console.error('Lỗi khi tạo đơn hàng:', order);
        throw new Error(order.message || "Đặt hàng thất bại");
      }

      // ✅ Thanh toán ZaloPay
      if (form.paymentMethod === "zalopay") {
        const zaloRes = await fetch(`${import.meta.env.VITE_API_URL}/payment/zalopay`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order._id,
            amount: order.totalPrice,
          }),
        });

        const zaloData = await zaloRes.json();

        if (!zaloRes.ok || !zaloData.order_url) {
          throw new Error("Không tạo được đơn hàng ZaloPay");
        }

        window.location.href = zaloData.order_url;
        return;
      }

      // ✅ Thanh toán MoMo
      if (form.paymentMethod === "momo") {
        const momoRes = await fetch(`${import.meta.env.VITE_API_URL}/payment/momo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idOrder: order._id,
            amountOrder: order.totalPrice,
          }),
        });

        const momoData = await momoRes.json();

        if (!momoRes.ok || !momoData.payUrl) {
          throw new Error("Không tạo được đơn hàng MoMo");
        }

        window.location.href = momoData.payUrl;
        return;
      }

      // ✅ Thanh toán VNPAY
      if (form.paymentMethod === "vnpay") {
        const vnpayRes = await fetch(`${import.meta.env.VITE_API_URL}/payment/vnpay`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idOrder: order._id,
            amountOrder: order.totalPrice * 100, // VNPAY yêu cầu nhân 100
          }),
        });

        const vnpayData = await vnpayRes.json();

        if (!vnpayRes.ok || !vnpayData.data?.vnpayUrl) {
          throw new Error("Không tạo được đơn hàng VNPAY");
        }

        window.location.href = vnpayData.data.vnpayUrl;
        return;
      }

      // ✅ Các phương thức còn lại
      clearCart();
      navigate('/confirmation', {
        state: {
          customerInfo: form,
          cartItems: validItems.map(item => ({
            name: item.product.name,
            image: item.product.image,
            price: Number(item.product.price),
            quantity: Number(item.quantity),
          })),
          totalPrice: total,
        },
      });
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Thanh toán</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Họ tên:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Địa chỉ:
          <textarea name="address" value={form.address} onChange={handleChange} required />
        </label>
        <label>
          Phương thức thanh toán:
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
            <option value="zalopay">ZaloPay</option>
            <option value="momo">MoMo</option>
            <option value="vnpay">VNPAY</option>
            <option value="cash_on_delivery">Thanh toán khi nhận hàng</option>
            <option value="bank_transfer">Chuyển khoản</option>
          </select>
        </label>

        <div className="checkout-summary">
          <h3>Giỏ hàng</h3>
          {cartItems.length === 0 ? (
            <p>Không có sản phẩm trong giỏ hàng.</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => {
                const price = Number(item?.product?.price || 0);
                const quantity = Number(item?.quantity || 0);
                const name = item?.product?.name || 'Không rõ';
                return (
                  <li key={index}>
                    {name} x {quantity} = {(price * quantity).toLocaleString()}₫
                  </li>
                );
              })}
            </ul>
          )}
          <p className="total-price">Tổng cộng: {total.toLocaleString()}₫</p>
        </div>

        <button type="submit" className="submit-button">Đặt hàng</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
