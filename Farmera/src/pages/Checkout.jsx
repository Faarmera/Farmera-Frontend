import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { PaystackButton } from 'react-paystack';
import { validateAddress } from '../utils/Validation';
import ErrorBoundary from '../utils/ErrorBoundary';
import { GiMailShirt } from 'react-icons/gi';

const Checkout = () => {
  // const [userEmail, setUserEmail] = useState('');
  // const [price, setPrice] = useState(null);
  const navigate = useNavigate();
  const { cart } = useCart();
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [pickupStation, setPickupStation] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [errors, setErrors] = useState({
    profile: null,
    cart: null,
    payment: null,
    order: null,
    validation: {},
  });

  const token = localStorage.getItem('token');

  // useEffect(() => {
  //     const fetchUserProfile = async () => {
  //         try {
  //             const response = await axios.get(
  //                'https://farmera-eyu3.onrender.com/api/v1/user/profile/get/SignedinUserProfile',
  //                 {
  //                     headers: {
  //                         Authorization: `Bearer ${token}`,
  //                     },
  //                 }
  //             );

  //             const userProfile = response.data;
  //             setUserEmail(userProfile.email);
  //         } catch (error) {
  //             console.error('Error fetching user profile:', error);
  //         }
  //     };

  //     fetchUserProfile();
  // }, [token]);

//   useEffect(() => {
//     const fetchCartDetails = async () => {
//         try {
//             const response = await axios.get(
//                 'https://farmera-eyu3.onrender.com/api/v1/cart/user',
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//             );

//             const cartData = response.data;
//             console.log(cartData)
//             setPrice(cartData.totalBill);
//             console.log('Total Bill:', cartData.totalBill);
//         } catch (error) {
//             console.error('Error fetching cart details:', error);
//         }
//     };

//     fetchCartDetails();
// }, [token]);

const email = "obasyemeka@gmail.com"
const price = 900
  
const paystackConfig = {
  reference: (new Date()).getTime().toString(),
  // email: userEmail,
  email: email,
  amount: price * 100,
  publicKey: 'pk_test_b5202d3d874ecb280c84d15f6ff56c905bd2442e',
};

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

  const handleError = (error, errorType) => {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'An unexpected error occurred';

    setErrors(prev => ({
      ...prev,
      [errorType]: errorMessage
    }));


    setTimeout(() => {
      setErrors(prev => ({
        ...prev,
        [errorType]: null
      }));
    }, 5000);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setPageLoading(true);
        await Promise.all([
          // fetchUserProfile(),
          // fetchCartDetails()
        ]);
      } catch (error) {
        handleError(error, 'profile');
      } finally {
        setPageLoading(false);
      }
    };

    loadInitialData();
  }, [token]);

  const handleAddressSubmit = () => {
    if (!validateDeliveryDetails()) {
      return;
    }
    setStep(2);
  };

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
    setErrors(prev => ({
      ...prev,
      validation: {}
    }));
  };

  const validateDeliveryDetails = () => {
    if (deliveryMethod === 'delivery') {
      const validationResult = validateAddress(shippingAddress);
      setErrors(prev => ({
        ...prev,
        validation: validationResult.errors
      }));
      return validationResult.isValid;
    }
    if (deliveryMethod === 'pickup' && !pickupStation) {
      setErrors(prev => ({
        ...prev,
        validation: { pickup: 'Please select a pickup station' }
      }));
      return false;
    }
    return true;
  };

  const handlePaystackSuccess = async (reference) => {
    try {
      setLoading(true);
      
      const orderData = {
        deliveryMethod,
        shippingAddress: deliveryMethod === 'delivery' ? shippingAddress : pickupStation,
        paymentMethod: 'Paystack',
        isPaid: true,
        cartItems: cart.cartItems,
        paymentReference: reference.reference,
      };

      const response = await axios.post(
        'https://farmera-eyu3.onrender.com/api/v1/order/add',
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      navigate(`/order-success/${response.data.orders._id}`, { 
        state: { order: response.data } 
      });
    } catch (error) {
      handleError(error, 'order');
    } finally {
      setLoading(false);
    }
  };

  const handlePaystackClose = () => {
    handleError({ message: 'Payment was canceled. Please try again.' }, 'payment');
  };


  const renderOrderSummary = () => (
    <OrderSummarySection>
      <h2>Order Summary</h2>
      <SummaryList>
        <SummaryTerm>Items Total:</SummaryTerm>
        <SummaryValue>₦{cart?.totalBill?.toLocaleString() || 0}</SummaryValue>
        
        <SummaryTerm>Delivery Method:</SummaryTerm>
        <SummaryValue>
          {deliveryMethod === 'delivery' ? 'Home Delivery' : 'Pickup Station'}
        </SummaryValue>
        
        <SummaryTerm>Delivery Location:</SummaryTerm>
        <SummaryValue>
          {deliveryMethod === 'delivery' ? shippingAddress : pickupStation}
        </SummaryValue>
        
        <SummaryTerm>Number of Items:</SummaryTerm>
        <SummaryValue>{cart?.cartItems?.length || 0}</SummaryValue>
      </SummaryList>
    </OrderSummarySection>
  );

  if (pageLoading) {
    return (
      <Container>
        <LoadingSpinner />
        <p>Loading checkout...</p>
      </Container>
    );
  }

  if (!cart?.cartItems?.length) {
    return (
      <Container>
        <EmptyMessage>Your cart is empty</EmptyMessage>
        <BackButton onClick={() => navigate('/buyer-cart')}>
          Return to Cart
        </BackButton>
      </Container>
    );
  }

  return (
    <ErrorBoundary>
      <Container>
        {loading && (
          <LoadingOverlay>
            <LoadingSpinner />
          </LoadingOverlay>
        )}

        <ProgressBar>
          <ProgressStep active={step >= 1}>1. Delivery</ProgressStep>
          <ProgressStep active={step >= 2}>2. Payment</ProgressStep>
        </ProgressBar>

        {/* Error Display Section */}
        <ErrorContainer>
          {Object.entries(errors).map(([key, error]) => {
            if (error && key !== 'validation') {
              return (
                <ErrorMessage key={key} severity={key === 'profile' ? 'error' : 'warning'}>
                  {error}
                </ErrorMessage>
              );
            }
            return null;
          })}
        </ErrorContainer>

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
                  onChange={(e) => {
                    setShippingAddress(e.target.value);
                    setErrors(prev => ({
                      ...prev,
                      validation: {}
                    }));
                  }}
                  placeholder="Enter your complete shipping address"
                  rows="3"
                />
                {Object.entries(errors.validation).map(([key, error]) => (
                  <ValidationMessage key={key} type="error">
                    {error}
                  </ValidationMessage>
                ))}
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
                      <div className="hours">
                        Operating Hours: {station.openHours}
                      </div>
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

            {renderOrderSummary()}
          </Section>
        )}

        {step === 2 && (
          <Section>
            <h2>Payment Method</h2>
            {renderOrderSummary()}
            <StyledPaystackButton
              as={PaystackButton}
              {...paystackConfig}
              text="Pay Now"
              onSuccess={handlePaystackSuccess}
              onClose={handlePaystackClose}
            />
          </Section>
        )}
      </Container>
    </ErrorBoundary>
  );
};

export default Checkout

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

const ErrorContainer = styled.div`
  margin-bottom: 1rem;
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

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #16a34a;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const OrderSummarySection = styled(Section)`
  background: #f8fafc;
  margin-top: 1rem;
`;

const SummaryList = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  margin: 0;
`;

const SummaryTerm = styled.dt`
  font-weight: 600;
  color: #475569;
`;

const SummaryValue = styled.dd`
  margin: 0;
  text-align: right;
  color: #1e293b;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ValidationMessage = styled.span`
  color: ${props => props.type === 'error' ? '#ef4444' : '#16a34a'};
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const StyledPaystackButton = styled.button`
  background-color: #16a34a;
  color: #fff;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #15803d;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: #166534;
  }
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
color: ${props => props.severity === 'error' ? '#ef4444' : '#f59e0b'};
padding: 1rem;
margin-bottom: 0.5rem;
background: ${props => props.severity === 'error' ? '#fee2e2' : '#fef3c7'};
border-radius: 4px;
display: flex;
align-items: center;
font-size: 0.875rem;

&:last-child {
  margin-bottom: 0;
}
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