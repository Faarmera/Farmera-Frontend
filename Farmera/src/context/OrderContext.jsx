// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchOrder = async () => {
//     try {
//         const token = localStorage.getItem("token");

//         const response = await axios.get('http://localhost:5000/api/v1/order/user', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },

//       });
//       setOrder(response.data);
//     } catch (error) {
//       console.error('Error fetching order:', error);
//       setError(error.response?.data?.error || 'Error fetching order');
//     }
//   };

//   useEffect(() => {
//     fetchOrder();
//   }, []);

// //   const createOrder = async (productId, quantity = 1) => {
// //     setLoading(true);
// //     try {
// //         const token = localStorage.getItem("token");
// //         const response = await axios.post('http://localhost:5000/api/v1/cart/add',
// //         {
// //           products: [{ productId, quantity }],
// //         },
// //         { 
// //           withCredentials: true 
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setCart(response.data.cart);
// //       return true;
// //     } catch (error) {
// //       setError(error.response?.data?.error || 'Error adding to cart');
// //       return false;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const decreaseQuantity = async (productId) => {
// //     setLoading(true);
// //     try {
// //         const token = localStorage.getItem("token");
// //         const response = await axios.patch('http://localhost:5000/api/v1/cart/decrease',
// //         { productId },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setCart(response.data.cart);
// //       return true;
// //     } catch (error) {
// //       setError(error.response?.data?.error || 'Error decreasing quantity');
// //       return false;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const removeFromCart = async (productId) => {
// //     setLoading(true);
// //     try {
// //         const token = localStorage.getItem("token");
// //       const response = await axios.delete('http://localhost:5000/api/v1/cart/delete',
// //         { productId },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setCart(response.data.cart);
// //       return true;
// //     } catch (error) {
// //       setError(error.response?.data?.error || 'Error removing from cart');
// //       return false;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const clearCart = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.delete('http://localhost:5000/api/v1/cart/clear',
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// //           },
// //         }
// //       );
// //       setCart(response.data.cart);
// //       return true;
// //     } catch (error) {
// //       setError(error.response?.data?.error || 'Error clearing cart');
// //       return false;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         loading,
//         error,
//         addToCart,
//         decreaseQuantity,
//         removeFromCart,
//         clearCart,
//         fetchCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// src/services/orderService.js
import axiosInstance from "../utils/AxiosInstance";

export const createOrder = async (orderData) => {
  const response = await axiosInstance.post("/order/add", orderData);
  return response.data;
};

// export const getAllOrders = async (queryParams = "") => {
//   const response = await axiosInstance.get("/order/get/allOrders");
//   return response.data;
// };

// export const getUserOrders = async (userId, queryParams = "") => {
//   const response = await axiosInstance.get(`/orders/user/`);
//   return response.data;
// };

export const getOrderById = async (orderId) => {
  const response = await axiosInstance.get(`/orders/${orderId}`);
  return response.data;
};

export const returnProduct = async (orderId, itemId) => {
  const response = await axiosInstance.post(`/orders/${orderId}/return/${itemId}`);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await axiosInstance.post(`/orders/${orderId}/cancel`);
  return response.data;
};
