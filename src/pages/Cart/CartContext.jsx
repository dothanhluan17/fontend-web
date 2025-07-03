  import React, { createContext, useContext, useEffect, useState } from "react";

  const CartContext = createContext();

  export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
      const id = product._id || product.id;
      if (!id) return console.warn("❌ Không có ID sản phẩm!");

      const standardizedProduct = { ...product, _id: id };

      setCartItems((prev) => {
        const existing = prev.find((item) => item.product._id === id);
        if (existing) {
          return prev.map((item) =>
            item.product._id === id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product: standardizedProduct, quantity }];
      });
    };

    const removeFromCart = (productId) => {
      setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        setCartItems((prev) =>
          prev.map((item) =>
            item.product._id === productId
              ? { ...item, quantity }
              : item
          )
        );
      }
    };

    const increaseQuantity = (productId) => {
      const item = cartItems.find((i) => i.product._id === productId);
      if (item) updateQuantity(productId, item.quantity + 1);
    };

    const decreaseQuantity = (productId) => {
      const item = cartItems.find((i) => i.product._id === productId);
      if (item) updateQuantity(productId, item.quantity - 1);
    };

    const clearCart = () => {
      setCartItems([]);
    };

    return (
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          updateQuantity,
          increaseQuantity,
          decreaseQuantity,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }

  export function useCart() {
    return useContext(CartContext);
  }
