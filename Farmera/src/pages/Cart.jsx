import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from "../context/AuthContext";
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
  const { cart, loading, error, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();

  const navigate = useNavigate();
  const { state: { isAuthenticated } } = useAuth();

  if (loading) return <div style={{textAlign: "center"}}>Loading cart...</div>;
  if (error) return <div style={{textAlign: "center"}}>Error: {error}</div>;
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
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      // Save the return path more explicitly
      navigate('/signin', { 
        state: { 
          returnTo: '/checkout',
          message: 'Please sign in to complete your checkout'
        } 
      });
    }
  };

  return (
    <CartContainer>
      <CartHeader>
        <h1>Shopping Cart</h1>
        <ClearButton onClick={clearCart}>Clear Cart</ClearButton>
      </CartHeader>

      <CartGrid>
        {/* <CartItems>
          {cart.cartItems.map((item) => (
            <CartItem key={item.product._id}>
              <ProductImage src={item.product.image} alt={item.product?.name} /> 
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
        </CartItems> */}

        <CartItems>
          {cart.cartItems?.map((item) => (
            item.product ? (  // Check if product exists
              <CartItem key={item.product._id}>
                <ProductImage 
                  src={item.product?.image || '/placeholder-image.jpg'} 
                  alt={item.product?.name || 'Product'} 
                />
                <ProductInfo>
                  <h3>{item.product?.name}</h3>
                  <p>{item.product?.description}</p>
                  <p>Store: {item.product?.store}</p>
                </ProductInfo>
                <QuantityControl>
                  <button onClick={() => decreaseQuantity(item.product?._id)}>
                    <FaMinus />
                  </button>
                  <span>{item?.quantity || 0}</span>
                  <button onClick={() => addToCart(item.product?._id, 1)}>
                    <FaPlus />
                  </button>
                </QuantityControl>
                <PriceInfo>
                  <p>₦{item?.price || 0}</p>
                  <DeleteButton onClick={() => removeFromCart(item.product?._id)}>
                    <FaTrash />
                  </DeleteButton>
                </PriceInfo>
              </CartItem>
            ) : null
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
            <CheckoutButton onClick={handleCheckout} disabled={cart.cartItems.length === 0}>
            {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
            </CheckoutButton>
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

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
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
