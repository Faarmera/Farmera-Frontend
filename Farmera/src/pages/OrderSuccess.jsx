import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OrderSuccess = ({ orderDetails }) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/buyer-store");
  };

  const handleTrackOrder = () => {
    navigate(`/orders/${orderDetails?.orderId || "tracking"}`);
  };

  return (
    <Container>
      <Message>
        <h1>🎉 Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.</p>
      </Message>

      <OrderSummary>
        <h2>Order Details</h2>
        <SummaryItem>
          <span>Order ID:</span> <span>{orderDetails?.orderId || "N/A"}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Payment Status:</span>{" "}
          <span>{orderDetails?.isPaid ? "Paid" : "Pending"}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Total Amount:</span>{" "}
          <span>₦{orderDetails?.totalAmount || "N/A"}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Delivery Method:</span>{" "}
          <span>{orderDetails?.deliveryMethod || "N/A"}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Shipping Address:</span>{" "}
          <span>{orderDetails?.shippingAddress || "N/A"}</span>
        </SummaryItem>
      </OrderSummary>

      <Actions>
        <ActionButton onClick={handleNavigateHome}>Go to Homepage</ActionButton>
        <ActionButton onClick={handleTrackOrder} primary>
          Track Order
        </ActionButton>
      </Actions>
    </Container>
  );
};

export default OrderSuccess;

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
`;

const Message = styled.div`
  h1 {
    font-size: 2rem;
    color: #16a34a;
  }

  p {
    font-size: 1.25rem;
    color: #6b7280;
    margin: 1rem 0 2rem;
  }
`;

const OrderSummary = styled.div`
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    color: #374151;
    margin-bottom: 1rem;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 1rem;

  span {
    font-weight: bold;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#2563eb" : "#16a34a")};
  color: white;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.primary ? "#1d4ed8" : "#15803d")};
  }
`;
