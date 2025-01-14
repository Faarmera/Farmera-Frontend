import React, { useState } from 'react';
import { useFlutterwave } from 'flutterwave-react-v3';
import { PaystackButton } from 'react-paystack';
import styled from 'styled-components';

const Payment = ({ amount, email, onSuccess, onClose }) => {
  const [selectedGateway, setSelectedGateway] = useState('');

  const paystackConfig = {
    reference: `ref-${Date.now()}`,
    email: email,
    amount: amount * 100, // Convert to kobo
    publicKey: 'your_paystack_public_key',
    text: 'Pay with Paystack',
  };

  const flutterwaveConfig = {
    public_key: "your_flutterwave_public_key",
    tx_ref: Date.now().toString(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,ussd,bank_transfer",
    customer: {
      email: email,
    },
    customizations: {
      title: "My Store",
      description: "Payment for items in cart",
    },
  };

  const handleFlutterwave = useFlutterwave(flutterwaveConfig);

  const handlePaystackSuccess = (response) => {
    onSuccess({ provider: 'paystack', reference: response.reference, ...response });
  };

  const handlePayment = (gateway) => {
    setSelectedGateway(gateway);
    if (gateway === 'flutterwave') {
      handleFlutterwave({
        callback: (response) => {
          onSuccess({ provider: 'flutterwave', reference: response.transaction_id, ...response });
        },
        onClose: () => onClose()
      });
    }
  };

  return (
    <Container>
      <Title>Select Payment Method</Title>
      <PaymentOptionsContainer>
        <PaymentOption 
          onClick={() => setSelectedGateway('paystack')}
          selected={selectedGateway === 'paystack'}
          hoverColor="#10b981"
        >
          <OptionTitle>Pay with Paystack</OptionTitle>
          <OptionDescription>Debit Card, Bank Transfer, USSD</OptionDescription>
          {selectedGateway === 'paystack' && (
            <StyledPaystackButton 
              {...paystackConfig} 
              onSuccess={handlePaystackSuccess} 
              onClose={onClose}
            />
          )}
        </PaymentOption>

        <PaymentOption 
          onClick={() => handlePayment('flutterwave')}
          selected={selectedGateway === 'flutterwave'}
          hoverColor="#3b82f6"
        >
          <OptionTitle>Pay with Flutterwave</OptionTitle>
          <OptionDescription>Cards, Bank Transfer, USSD</OptionDescription>
        </PaymentOption>

        <AmountContainer>
          <AmountText>
            Amount to pay: ₦{amount?.toLocaleString()}
          </AmountText>
        </AmountContainer>
      </PaymentOptionsContainer>
    </Container>
  );
};

export default Payment;

const Container = styled.div`
  max-width: 28rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const PaymentOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentOption = styled.div`
  padding: 1rem;
  border: 1px solid ${props => props.selected ? props.hoverColor : '#e5e7eb'};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${props => props.hoverColor};
  }
`;

const OptionTitle = styled.h3`
  font-weight: 600;
`;

const OptionDescription = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

const StyledPaystackButton = styled(PaystackButton)`
  margin-top: 0.5rem;
  width: 100%;
  background-color: #10b981;
  color: white;
  padding: 0.5rem 0;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #059669;
  }
`;

const AmountContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const AmountText = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
`;