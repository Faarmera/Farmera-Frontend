// import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styled from "styled-components";

// Styled Components
const FooterSellContainer = styled.div`
  background-color: #065f46;
  color: #ffffff;
`;

const FooterSellWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 400px;
  display: none;
  @media (min-width: 768px) {
    display: block;
    
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const Content = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: #e6fffa; /* Lighter green text for better readability */
`;

const SignUpLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #ffffff;
  color: #065f46;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s;
  width: fit-content;

  &:hover {
    background-color: #d1fae5; /* Light green hover */
  }

  .icon {
    margin-left: 0.5rem;
    height: 1.25rem;
    width: 1.25rem;
  }
`;

// Component
export default function FooterSellSection() {
  return (
    <FooterSellContainer>
      <FooterSellWrapper>
        {/* Image Section */}
        <ImageContainer>
          <img
            src="https://images.unsplash.com/photo-1495570689269-d883b1224443?auto=format&fit=crop&q=80"
            alt="Farmer in field"
          />
        </ImageContainer>

        {/* Content Section */}
        <Content>
          <Title>Join over 1600 farmers selling today!</Title>
          <Description>
            Connect directly with customers and grow your farming business. Join our community of successful farmers and
            start selling your produce today.
          </Description>
          <SignUpLink to="/signup">
            Sign up to sell
            <ArrowRight className="icon" />
          </SignUpLink>
        </Content>
      </FooterSellWrapper>
    </FooterSellContainer>
  );
}
