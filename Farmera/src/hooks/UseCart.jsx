// import { useState } from 'react';
// // import CartContext from "../context/CartContext";
// const useCart = () => {
//   const [cart, setCart] = useState({ items: [], totalQuantity: 0 });

//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existingItemIndex = prevCart.items.findIndex((item) => item.id === product.id);
//       if (existingItemIndex > -1) {
//         const updatedItems = [...prevCart.items];
//         updatedItems[existingItemIndex].qty += 1; // Increase quantity
//         return {
//           ...prevCart,
//           items: updatedItems,
//           totalQuantity: prevCart.totalQuantity + 1,
//         };
//       } else {
//         return {
//           items: [...prevCart.items, { ...product, qty: 1 }],
//           totalQuantity: prevCart.totalQuantity + 1,
//         };
//       }
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prevCart) => {
//       const updatedItems = prevCart.items.filter((item) => item.id !== id);
//       const totalQuantity = updatedItems.reduce((acc, item) => acc + item.qty, 0);
//       return {
//         items: updatedItems,
//         totalQuantity,
//       };
//     });
//   };

//   const clearCart = () => {
//     setCart({ items: [], totalQuantity: 0 });
//   };

//   return { cart, addToCart, removeFromCart, clearCart };
// };

// export default useCart;
