import React, { createContext, useState, useEffect } from "react";
import cartService from "./cartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  const fetchCart = async () => {
    try {
      const response = await cartService.getUserCart(token);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, loading, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
