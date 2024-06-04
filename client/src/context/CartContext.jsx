import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const { isAuthenticated, getToken } = useAuth();
  const [cart, setCart] = useState(() => {
    const token = getToken();
    const savedCart = token ? localStorage.getItem(`cart_${token}`) : null;
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    const token = getToken();
    if (token) {
      localStorage.setItem(`cart_${token}`, JSON.stringify(cart));
    }
  }, [cart, getToken]);
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, cartItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};