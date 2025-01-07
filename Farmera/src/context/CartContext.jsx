import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
        const token = localStorage.getItem("token");
        // if (!token) {
        //   console.log("No token")
        //   return;
        // }
      const response = await axios.get('https://farmera-eyu3.onrender.com/api/v1/cart/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError(error.response?.data?.error || 'Error fetching cart');
    }
  };

  useEffect(() => {
    // fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://farmera-eyu3.onrender.com/api/v1/cart/add',
        {
          products: [{ productId, quantity }],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCart(response.data.cart);
      return true;
    } catch (error) {
      setError(error.response?.data?.error || 'Error adding to cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const decreaseQuantity = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://farmera-eyu3.onrender.com/api/v1/cart/decrease',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCart(response.data.cart);
      return true;
    } catch (error) {
      setError(error.response?.data?.error || 'Error decreasing quantity');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://farmera-eyu3.onrender.com/api/v1/cart/delete',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCart(response.data.cart);
      return true;
    } catch (error) {
      setError(error.response?.data?.error || 'Error removing from cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://farmera-eyu3.onrender.com/api/v1/cart/clear',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCart(response.data.cart);
      return true;
    } catch (error) {
      setError(error.response?.data?.error || 'Error clearing cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};