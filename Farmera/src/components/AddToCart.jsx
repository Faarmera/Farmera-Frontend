// import React from 'react';
// import { useCart } from './useCart';
// import { useOperation } from './useOperation';

// // Inside your AddToCartComponent
// const AddToCartComponent = ({ product }) => {
//   const { cart, addToCart, removeFromCart } = useCart();
//   const { loading, performOperation } = useOperation();

//   const handleAddToCart = () => {
//     performOperation(addToCart, product);
//   };

//   return (
//     <div>
//       <button onClick={handleAddToCart} disabled={loading}>
//         {loading ? 'Adding...' : 'Add to Cart'}
//       </button>
//     </div>
//   );
// };