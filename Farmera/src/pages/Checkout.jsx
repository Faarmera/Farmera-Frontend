import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import OrderContext from '../context/OrderContext';
import Payment from './Payment';

const Checkout = () => {

  const pickupStations = [
    {
      id: 1,
      name: 'Central Mall Station',
      address: '123 Central Mall, Victoria Island, Lagos',
      openHours: '9:00 AM - 8:00 PM'
    },
    {
      id: 2,
      name: 'Ikeja City Station',
      address: '45 Allen Avenue, Ikeja, Lagos',
      openHours: '8:00 AM - 9:00 PM'
    },
    {
      id: 3,
      name: 'Lekki Phase 1 Station',
      address: '789 Admiralty Way, Lekki Phase 1, Lagos',
      openHours: '8:00 AM - 7:00 PM'
    },
    {
      id: 4,
      name: 'Surulere Hub',
      address: '321 Adeniran Ogunsanya St, Surulere, Lagos',
      openHours: '9:00 AM - 8:00 PM'
    }
  ];

  const navigate = useNavigate();
  const { cart } = useCart();
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [pickupStation, setPickupStation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setError('');
  };

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
    setError('');
  };

  const handleAddressSubmit = () => {
    if (deliveryMethod === 'delivery' && !shippingAddress.trim()) {
      setError('Please enter a shipping address');
      return;
    }
    if (deliveryMethod === 'pickup' && !pickupStation) {
      setError('Please select a pickup station');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }
    setStep(3);
  };

  const handleOrderSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      const paymentResult = await processPayment();
      
      if (paymentResult.success) {
        const address = deliveryMethod === 'delivery' ? shippingAddress : pickupStation;
        const response = await OrderContext.createOrder(address);
        
        navigate(`/order-success/${response.order._id}`);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to process payment and create order');
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  };

  const handlePaymentSuccess = async (response) => {
    try {
      const verificationResponse = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference: response.reference,
          provider: response.provider
        }),
      });

      const result = await verificationResponse.json();
      
      if (result.success) {
        // Handle successful payment
        console.log('Payment verified successfully');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
    }
  };

  const handlePaymentClose = () => {
    console.log('Payment cancelled');
  };

  if (!cart || cart.cartItems.length === 0) {
    return (
      <Container>
        <EmptyMessage>Your cart is empty</EmptyMessage>
        <BackButton onClick={() => navigate('/buyer-cart')}>Return to Cart</BackButton>
      </Container>
    );
  }

  return (
    <Container>
      <ProgressBar>
        <ProgressStep active={step >= 1}>1. Delivery</ProgressStep>
        <ProgressStep active={step >= 2}>2. Payment</ProgressStep>
        <ProgressStep active={step >= 3}>3. Confirm</ProgressStep>
      </ProgressBar>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {step === 1 && (
        <Section>
          <h2>Delivery Method</h2>
          <DeliveryOptions>
            <DeliveryOption
              selected={deliveryMethod === 'delivery'}
              onClick={() => handleDeliveryMethodChange('delivery')}
            >
              <h3>Home Delivery</h3>
              <p>Deliver to your address</p>
            </DeliveryOption>

            <DeliveryOption
              selected={deliveryMethod === 'pickup'}
              onClick={() => handleDeliveryMethodChange('pickup')}
            >
              <h3>Pickup Station</h3>
              <p>Collect from nearest pickup point</p>
            </DeliveryOption>
          </DeliveryOptions>

          {deliveryMethod === 'delivery' && (
            <AddressInput>
              <label>Shipping Address</label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your complete shipping address"
                rows="3"
              />
            </AddressInput>
          )}

          {deliveryMethod === 'pickup' && (
            <PickupStations>
              <label>Select Pickup Station</label>
              <div>
                {pickupStations.map(station => (
                  <PickupStation
                    key={station.id}
                    selected={pickupStation === station.address}
                    onClick={() => setPickupStation(station.address)}
                  >
                    <h4>{station.name}</h4>
                    <p>{station.address}</p>
                    <div className="hours">Operating Hours: {station.openHours}</div>
                  </PickupStation>
                ))}
              </div>
            </PickupStations>
          )}

          <Button 
            onClick={handleAddressSubmit}
            disabled={!deliveryMethod || loading}
          >
            Continue to Payment
          </Button>
        </Section>
      )}

{step === 2 && (
        <Section>
          <h2>Payment Method</h2>
          <PaymentOptions>
            <PaymentOption
              selected={paymentMethod === 'card'}
              onClick={() => handlePaymentMethodChange('card')}
            >
              <h3>Card Payment</h3>
              <p>Pay with your debit or credit card</p>
            </PaymentOption>

            <PaymentOption
              selected={paymentMethod === 'transfer'}
              onClick={() => handlePaymentMethodChange('transfer')}
            >
              <h3>Bank Transfer</h3>
              <p>Pay via bank transfer</p>
            </PaymentOption>

            <PaymentOption
              selected={paymentMethod === 'ussd'}
              onClick={() => handlePaymentMethodChange('ussd')}
            >
              <h3>USSD</h3>
              <p>Pay using USSD code</p>
            </PaymentOption>
          </PaymentOptions>

          {paymentMethod === 'card' && (
            <CardDetails>
              <InputGroup>
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </InputGroup>
              <Row>
                <InputGroup>
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" />
                </InputGroup>
                <InputGroup>
                  <label>CVV</label>
                  <input type="text" placeholder="123" />
                </InputGroup>
              </Row>
            </CardDetails>
          )}

          <Button 
            onClick={handlePaymentSubmit}
            disabled={!paymentMethod || loading}
          >
            Continue to Review
          </Button>
        </Section>
      )}

{step === 3 && (
        <Section>
          <h2>Order Summary</h2>
          <OrderSummary>
            <SummaryItem>
              <span>Delivery Method:</span>
              <span>{deliveryMethod === 'delivery' ? 'Home Delivery' : 'Pickup'}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Address:</span>
              <span>{deliveryMethod === 'delivery' ? shippingAddress : pickupStation}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Payment Method:</span>
              <span>{paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Total Items:</span>
              <span>{cart.cartItems.length}</span>
            </SummaryItem>
            <SummaryItem total>
              <span>Total Amount:</span>
              <span>₦{cart.totalBill}</span>
            </SummaryItem>
          </OrderSummary>

          <Button 
            onClick={handleOrderSubmit}
            disabled={loading}
          >
            {loading ? 'Processing Payment...' : 'Pay and Place Order'}
          </Button>
        </Section>
      )}

      <PageContainer>
          <PaymentComponent 
            amount={1000} // Amount in Naira
            email="customer@example.com"
            onSuccess={handlePaymentSuccess}
            onClose={handlePaymentClose}
          />
        </PageContainer>
    </Container>
  );
};

export default Checkout;

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressStep = styled.div`
  color: ${props => props.active ? '#16a34a' : '#94a3b8'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const Section = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h2 {
    margin: 0 0 1.5rem 0;
  }
`;

const DeliveryOptions = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const DeliveryOption = styled.div`
  padding: 1.5rem;
  border: 2px solid ${props => props.selected ? '#16a34a' : '#e5e7eb'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #16a34a;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.selected ? '#16a34a' : 'inherit'};
  }

  p {
    margin: 0;
    color: #666;
  }
`;

const AddressInput = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: #16a34a;
    }
  }
`;

const PaymentOptions = styled(DeliveryOptions)``;

const PaymentOption = styled(DeliveryOption)``;

const PageContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const PaymentComponent = styled.div`
  
`

const CardDetails = styled.div`
  margin: 1.5rem 0;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: #16a34a;
    }
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const PickupStations = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  > div {
    display: grid;
    gap: 1rem;
  }
`;

const PickupStation = styled.div`
  padding: 1.25rem;
  border: 2px solid ${props => props.selected ? '#16a34a' : '#e5e7eb'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #16a34a;
    background-color: ${props => props.selected ? '#f0fdf4' : '#ffffff'};
  }

  h4 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.selected ? '#16a34a' : 'inherit'};
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }

  .hours {
    margin-top: 0.5rem;
    color: #888;
    font-size: 0.85rem;
    font-style: italic;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #16a34a;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #15803d;
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #fee2e2;
  border-radius: 4px;
`;

const OrderSummary = styled.div`
  margin-bottom: 1.5rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
  
  ${props => props.total && `
    font-weight: bold;
    font-size: 1.1rem;
    border-bottom: none;
  `}
`;

const EmptyMessage = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const BackButton = styled(Button)`
  max-width: 200px;
  margin: 0 auto;
  display: block;
`;