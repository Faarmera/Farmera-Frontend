import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [guestCart, setGuestCart] = useState(() => {
    const savedCart = localStorage.getItem('guestCart');
    return savedCart ? JSON.parse(savedCart) : { cartItems: [], totalBill: 0 };
  });

  useEffect(() => {
    localStorage.setItem('guestCart', JSON.stringify(guestCart));
  }, [guestCart]);

  const isAuthenticated = !!localStorage.getItem("token");

  const currentCart = isAuthenticated ? cart : guestCart;

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //     return;
    // }

    if (!isAuthenticated) return;
    
    try {
        const response = await axios.get('https://farmera-eyu3.onrender.com/api/v1/cart/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });
        setCart(response.data);
    } catch (error) {
        console.error('Error fetching cart:', error);
        setError(error.response?.data?.error || 'Error fetching cart');
    }
};

  useEffect(() => {
    fetchCart();
  }, []);

  // const addToCart = async (productId, quantity = 1) => {
  //   setLoading(true);
  //   try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.post('https://farmera-eyu3.onrender.com/api/v1/cart/add',
  //       {
  //         products: [{ productId, quantity }],
  //       },
  //       {
  //         withCredentials: true
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setCart(response.data.cart);
  //     return true;
  //   } catch (error) {
  //     setError(error.response?.data?.error || 'Error adding to cart');
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      if (!isAuthenticated) {
        // Handle guest cart
        const response = await axios.get(`https://farmera-eyu3.onrender.com/api/v1/products/${productId}`);
        const product = response.data;
        
        const existingItem = guestCart.cartItems.find(item => item.product._id === productId);
        if (existingItem) {
          existingItem.quantity += quantity;
          existingItem.price = existingItem.quantity * product.price;
        } else {
          guestCart.cartItems.push({
            product,
            quantity,
            price: product.price * quantity
          });
        }
        
        guestCart.totalBill = guestCart.cartItems.reduce((total, item) => total + item.price, 0);
        setGuestCart({...guestCart});
        return true;
      }
      
      // Handle authenticated cart
      // ... your existing addToCart code
          const token = localStorage.getItem("token");
          const response = await axios.post('https://farmera-eyu3.onrender.com/api/v1/cart/add',
          {
            products: [{ productId, quantity }],
          },
          {
            withCredentials: true
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
      if (!isAuthenticated) {
        // Handle guest cart
        const itemIndex = guestCart.cartItems.findIndex(item => item.product._id === productId);
        if (itemIndex === -1) {
          throw new Error('Product not found in cart');
        }
  
        const item = guestCart.cartItems[itemIndex];
        if (item.quantity <= 1) {
          guestCart.cartItems.splice(itemIndex, 1);
        } else {
          item.quantity -= 1;
          item.price = item.quantity * item.product.price;
        }
  
        guestCart.totalBill = guestCart.cartItems.reduce((total, item) => total + item.price, 0);
        setGuestCart({...guestCart});
        return true;
      }
        const token = localStorage.getItem("token");
        const response = await axios.patch('https://farmera-eyu3.onrender.com/api/v1/cart/decrease',
        { productId },
        {
          withCredentials: true
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      if (!isAuthenticated) {
        // Handle guest cart
        const itemIndex = guestCart.cartItems.findIndex(item => item.product._id === productId);
        if (itemIndex === -1) {
          throw new Error('Product not found in cart');
        }
  
        guestCart.cartItems.splice(itemIndex, 1);
        guestCart.totalBill = guestCart.cartItems.reduce((total, item) => total + item.price, 0);
        setGuestCart({...guestCart});
        return true;
      }

      const token = localStorage.getItem("token");
      const response = await axios.delete('https://farmera-eyu3.onrender.com/api/v1/cart/delete',
        { productId },
        {
          withCredentials: true
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    setLoading(true);
    try {
      if (!isAuthenticated) {
        // Handle guest cart
        setGuestCart({ cartItems: [], totalBill: 0 });
        return true;
      }

      const response = await axios.delete('https://farmera-eyu3.onrender.com/api/v1/cart/clear',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
        {
          withCredentials: true
        },
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
  
  const mergeCartsAfterLogin = async (token) => {
    if (guestCart.cartItems.length === 0) return;
    
    try {
      const products = guestCart.cartItems.map(item => ({
        productId: item.product._id,
        quantity: item.quantity
      }));
      
      await axios.post('https://farmera-eyu3.onrender.com/api/v1/cart/add',
        { products },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );
      
      // Clear guest cart after successful merge
      setGuestCart({ cartItems: [], totalBill: 0 });
      
      // Fetch the updated cart
      await fetchCart();
    } catch (error) {
      console.error('Error merging carts:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cart: currentCart,
      loading,
      error,
      addToCart,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      mergeCartsAfterLogin
    }}>
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