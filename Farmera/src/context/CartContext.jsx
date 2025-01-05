// import React, { createContext, useContext, useReducer, useEffect } from "react";

// // Initial State
// const initialState = {
//   items: [],
//   total: 0,
//   totalQuantity: 0,
// };

// // Cart Reducer

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "LOAD_CART":
//   return {
//     ...state,
//     items: action.payload.items,
//     total: action.payload.total,
//     totalQuantity: action.payload.totalQuantity,
//   };

//     case "ADD_ITEM": {
//       const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
//       if (existingItemIndex > -1) {
//         const updatedItems = [...state.items];
//         updatedItems[existingItemIndex].quantity += 1; // Increase quantity
//         return {
//           ...state,
//           items: updatedItems,
//           total: state.total + action.payload.price,
//           totalQuantity: state.totalQuantity + 1,
//         };
//       }
      
//       return {
//         ...state,
//         items: [...state.items, { ...action.payload, quantity: 1 }],
//         total: state.total + action.payload.price,
//         totalQuantity: state.totalQuantity + 1,
//       };
//     }
//     case "REMOVE_ITEM": {
//       const item = state.items.find((item) => item.id === action.payload);
//       const updatedItems = state.items.filter((item) => item.id !== action.payload);
//       return {
//         ...state,
//         items: updatedItems,
//         total: state.total - (item ? item.price * item.quantity : 0),
//         totalQuantity: state.totalQuantity - (item ? item.quantity : 0),
//       };
//     }
//     case "UPDATE_QUANTITY": {
//       const item = state.items.find((item) => item.id === action.payload.id);
//       if (!item) return state;
//       const quantityDiff = action.payload.quantity - item.quantity;
//       const updatedItems = state.items.map((item) =>
//         item.id === action.payload.id
//           ? { ...item, quantity: action.payload.quantity }
//           : item
//       );
//       return {
//         ...state,
//         items: updatedItems,
//         total: state.total + item.price * quantityDiff,
//         totalQuantity: state.totalQuantity + quantityDiff,
//       };
//     }
//     case "CLEAR_CART":
//       return { items: [], total: 0, totalQuantity: 0 };
//     default:
//       return state;
//   }
// };

// // Cart Context
// const CartContext = createContext(null);

// // Cart Provider
// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);
//   useEffect(() => {
//     // Load cart from local storage
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       const parsedCart = JSON.parse(storedCart);
//       dispatch({ type: 'LOAD_CART', payload: parsedCart });
//     }
//   }, []);

//   useEffect(() => {
//     // Save cart to local storage whenever it updates
//     localStorage.setItem('cart', JSON.stringify(state));
//   }, [state]);

//   // Helper Functions
//   const addToCart = (product) => {
//     dispatch({ type: "ADD_ITEM", payload: product });
//   };

//   const removeFromCart = (id) => {
//     dispatch({ type: "REMOVE_ITEM", payload: id });
//   };

//   const updateQuantity = (id, quantity) => {
//     if (quantity < 1) return;
//     dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
//   };

//   const clearCart = () => {
//     dispatch({ type: "CLEAR_CART" });
//   };

//   return (
//     <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom Hook
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
