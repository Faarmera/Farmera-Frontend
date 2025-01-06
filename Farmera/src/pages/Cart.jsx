// // import React from "react";
// import { Minus, Plus, Trash2 } from "lucide-react";
// // import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";


// export default function Cart() {
//   // const { state, dispatch } = useCart();
//   // const { state: authState } = useAuth();
//   const navigate = useNavigate();

//   const updateQuantity = (id, quantity) => {
//     if (quantity < 1) return;
//     dispatch({
//       type: "UPDATE_QUANTITY",
//       payload: { id, quantity },
//     });
//   };

//   const removeItem = (id) => {
//     dispatch({
//       type: "REMOVE_ITEM",
//       payload: id,
//     });
//   };

//   const handleCheckout = () => {
//     if (!authState.isAuthenticated) {
//       navigate("/signin");
//       return;
//     }
//     // Proceed with checkout
//   };

//   // if (state.items.length === 0) {
//   //   return (
//   //     <Container>
//   //       <Wrapper>
//   //         <EmptyCart>
//   //           <h2>Your Cart is Empty</h2>
//   //           <p>Add some fresh products to your cart!</p>
//   //         </EmptyCart>
//   //       </Wrapper>
//   //     </Container>
//   //   );
//   // }

//   return (
//     <Container>
//       <Wrapper>
//         <Title>Shopping Cart</Title>
//         <Grid>
//           {/* Cart Items */}
//           {/* <div>
//             {state.items.map((item) => (
//               <CartItem key={item.id}>
//                 <img src={item.image} alt={item.name} />
//                 <ItemDetails>
//                   <h3>{item.name}</h3>
//                   <p>
//                     ₦{item.price}/{item.unit}
//                   </p>
//                 </ItemDetails>
//                 <QuantityControls>
//                   <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
//                     <Minus />
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
//                     <Plus />
//                   </button>
//                 </QuantityControls>
//                 <ItemPrice>
//                   <p>₦{(item.price * item.quantity).toFixed(2)}</p>
//                   <button onClick={() => removeItem(item.id)}>
//                     <Trash2 />
//                   </button>
//                 </ItemPrice>
//               </CartItem>
//             ))}
//           </div> */}

//           {/* Order Summary */}
//           {/* <OrderSummary>
//             <h3>Order Summary</h3>
//             <div className="summary-row">
//               <span>Subtotal</span>
//               <span>₦{state.total.toFixed(2)}</span>
//             </div>
//             <div className="summary-row">
//               <span>Shipping</span>
//               <span>Free</span>
//             </div>
//             <div className="summary-row total">
//               <span>Total</span>
//               <span>₦{state.total.toFixed(2)}</span>
//             </div>
//             <button onClick={handleCheckout}>
//               {authState.isAuthenticated ? "Proceed to Checkout" : "Sign in to Checkout"}
//             </button>
//           </OrderSummary> */}
//         </Grid>
//       </Wrapper>
//     </Container>
//   );
// }

// // Styled Components
// const Container = styled.div`
//   min-height: 100vh;
//   padding-top: 6rem;
//   padding: 1rem;
//   background-color: #f9fafb;
// `;

// const Wrapper = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const Title = styled.h2`
//   font-size: 1.5rem;
//   font-weight: bold;
//   margin-bottom: 2rem;
// `;

// const Grid = styled.div`
//   display: grid;
//   gap: 2rem;

//   @media (min-width: 1024px) {
//     grid-template-columns: 2fr 1fr;
//   }
// `;

// const Card = styled.div`
//   background-color: white;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const CartItem = styled(Card)`
//   display: flex;
//   gap: 1rem;
//   align-items: center;

//   img {
//     width: 6rem;
//     height: 6rem;
//     border-radius: 0.375rem;
//     object-fit: cover;
//   }
// `;

// const ItemDetails = styled.div`
//   flex: 1;

//   h3 {
//     font-size: 1rem;
//     font-weight: bold;
//   }

//   p {
//     color: #16a34a;
//   }
// `;

// const QuantityControls = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   button {
//     background: none;
//     border: none;
//     padding: 0.5rem;
//     border-radius: 50%;
//     cursor: pointer;

//     &:hover {
//       background-color: #f3f4f6;
//     }
//   }

//   span {
//     width: 2rem;
//     text-align: center;
//     font-size: 1rem;
//   }
// `;

// const ItemPrice = styled.div`
//   text-align: right;

//   p {
//     font-weight: bold;
//   }

//   button {
//     color: #ef4444;
//     background: none;
//     border: none;
//     cursor: pointer;

//     &:hover {
//       color: #dc2626;
//     }
//   }
// `;

// const OrderSummary = styled(Card)`
//   h3 {
//     font-size: 1.25rem;
//     font-weight: bold;
//     margin-bottom: 1rem;
//   }

//   .summary-row {
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 0.5rem;
//   }

//   .total {
//     border-top: 1px solid #e5e7eb;
//     margin-top: 1rem;
//     padding-top: 1rem;
//     font-weight: bold;
//   }

//   button {
//     width: 100%;
//     background-color: #16a34a;
//     color: white;
//     padding: 0.75rem;
//     border: none;
//     border-radius: 0.5rem;
//     font-size: 1rem;
//     cursor: pointer;
//     transition: background-color 0.3s;

//     &:hover {
//       background-color: #15803d;
//     }
//   }
// `;

// const EmptyCart = styled.div`
//   text-align: center;

//   h2 {
//     font-size: 1.5rem;
//     font-weight: bold;
//     margin-bottom: 1rem;
//   }

//   p {
//     color: #6b7280;
//     margin-bottom: 2rem;
//   }
// `;

// // import React from 'react';

// // const Cart = () => {
// //   return (
// //     <>
// //       <h1>THIS IS THE CART</h1>
// //     </>
// //   );
// // };

// // export default Cart;

// import React from "react";
// import { useCart } from "../../context/CartContext";
// import { Link } from "react-router-dom";

// const CartPage = () => {
//   const { state, removeFromCart, updateQuantity, clearCart } = useCart();

//   if (state.items.length === 0) {
//     return (
//       <div style={{ textAlign: "center", padding: "2rem" }}>
//         <h1>Your Cart is Empty</h1>
//         <Link to="/store">
//           <button style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "0.5rem" }}>
//             Go to Store
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Your Cart</h1>
//       <ul>
//         {state.items.map((item) => (
//           <li key={item.id} style={{ marginBottom: "1rem", listStyle: "none" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span>
//                 {item.name} - ₦{item.price} x {item.quantity}
//               </span>
//               <div>
//                 <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
//                 <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
//                 <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: "1rem", color: "red" }}>
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div>
//         <h2>Total: ₦{state.total}</h2>
//         <h3>Total Items: {state.totalQuantity}</h3>
//         <button onClick={clearCart} style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "0.5rem" }}>
//           Clear Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;






// import React from "react";
// import styled from "styled-components";
// import { useCart } from "../../context/CartContext";

// const CartPage = () => {
//   const { state, updateQuantity, removeFromCart, clearCart } = useCart();

//   const handleCheckout = () => {
//     // Simulate checkout process
//     alert("Checkout successful! Thank you for your purchase.");
//     clearCart(); // Clear the cart after checkout
//   };

//   if (state.items.length === 0) {
//     return (
//       <Container>
//         <h1>Your Cart is Empty</h1>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <h1>Your Cart</h1>
//       <CartItems>
//         {state.items.map((item) => (
//           <CartItem key={item.id}>
//             <img src={item.image} alt={item.name} />
//             <div>
//               <h3>{item.name}</h3>
//               <p>₦{item.price}</p>
//               <QuantityControls>
//                 <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
//                 <span>{item.quantity}</span>
//                 <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
//               </QuantityControls>
//               <button onClick={() => removeFromCart(item.id)}>Remove</button>
//             </div>
//           </CartItem>
//         ))}
//       </CartItems>
//       <CartSummary>
//         <p>Total: ₦{state.total}</p>
//         <p>Total Items: {state.totalQuantity}</p>
//         <button onClick={clearCart}>Clear Cart</button>
//         <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton> {/* Checkout Button */}
//       </CartSummary>
//     </Container>
//   );
// };

// export default CartPage;

// const Container = styled.div`

//   padding: 2rem;
//   max-width: 1200px;
//   margin: 0 auto;
  
//   @media (min-width: 640px) {
   
//   }

//   @media (min-width: 1024px) {
//   }
// `;

// const CartItems = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 2rem;
  
// `;

// const CartItem = styled.div`
//   display: block;
//   gap: 1rem;
//   img {
//     width: 100px;
//     height: 100px;
//     object-fit: cover;
//   }
// `;

// const QuantityControls = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   button {
//     background: #16a34a;
//     border-radius:5px;
//     color: white;
//     border: none;
//     padding: 0.25rem 0.5rem;
//     cursor: pointer;
//   }
// `;

// const CartSummary = styled.div`
//   margin-top: 2rem;
//   p {
//     font-size: 1.5rem;
//     font-weight:bold;
//     font:;
//   }
//   button {
//     background: #16a34a;
//     border-radius:5px;
//     color: white;
//     padding: 0.5rem 1rem;
//     border: none;
//     cursor: pointer;
//     margin-right: 3rem; // Space between buttons
//   }
// `;

// const CheckoutButton = styled.button`
//   background: #16a34a; // Green color for checkout button
//   color: white;
//   padding: 0.5rem 1rem;
//   border: none;
//   cursor: pointer;
//   margin-left: 1rem; // Space between clear cart and checkout buttons
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #15803d; // Darker green on hover
//   }
// `;


import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
  const { cart, loading, error, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cart || cart.cartItems.length === 0) {
    return (
      <EmptyCartContainer>
        <h2>Your cart is empty</h2>
        <Link to="/buyer-store">
          <ShopButton>Continue Shopping</ShopButton>
        </Link>
      </EmptyCartContainer>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <h1>Shopping Cart</h1>
        <ClearButton onClick={clearCart}>Clear Cart</ClearButton>
      </CartHeader>

      <CartGrid>
        <CartItems>
          {cart.cartItems.map((item) => (
            <CartItem key={item.product._id}>
              <ProductImage src={item.product.images[0]} alt={item.product.name} />
              <ProductInfo>
                <h3>{item.product.name}</h3>
                <p>{item.product.description}</p>
                <p>Store: {item.product.store}</p>
              </ProductInfo>
              <QuantityControl>
                <button onClick={() => decreaseQuantity(item.product._id)}>
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item.product._id, 1)}>
                  <FaPlus />
                </button>
              </QuantityControl>
              <PriceInfo>
                <p>₦{item.price}</p>
                <DeleteButton onClick={() => removeFromCart(item.product._id)}>
                  <FaTrash />
                </DeleteButton>
              </PriceInfo>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <h2>Cart Summary</h2>
          <SummaryItem>
            <span>Total Items:</span>
            <span>{cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Total Amount:</span>
            <span>₦{cart.totalBill}</span>
          </SummaryItem>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
          <ContinueShoppingButton to="/buyer-store">
            Continue Shopping
          </ContinueShoppingButton>
        </CartSummary>
      </CartGrid>
    </CartContainer>
  );
};

export default Cart;

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }
  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background: #f3f4f6;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #e5e7eb;
    }
  }

  span {
    min-width: 2rem;
    text-align: center;
  }
`;

const PriceInfo = styled.div`
  text-align: right;
  
  p {
    margin: 0 0 0.5rem 0;
    font-weight: bold;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #dc2626;
  }
`;

const CartSummary = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;

  h2 {
    margin: 0 0 1rem 0;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;

  &:last-of-type {
    border-bottom: none;
    font-weight: bold;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: #16a34a;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 1rem;

  &:hover {
    background: #15803d;
  }
`;

const ContinueShoppingButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  padding: 0.75rem;
  background: #f3f4f6;
  color: #374151;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background: #e5e7eb;
  }
`;

const ClearButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;

const EmptyCartContainer = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const ShopButton = styled.button`
  background: #16a34a;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;

  &:hover {
    background: #15803d;
  }
`;
