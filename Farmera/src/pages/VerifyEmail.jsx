import React from 'react';
import styled from 'styled-components';
import { Mail } from 'lucide-react';

const VerifyEmail = () => {
  const openEmailClient = () => {
    window.location.href = "mailto:";
  };

  return (
    <Container>
      <Wrapper>
        <Card>
          <IconWrapper>
            <Mail size={32} color="#16a34a" />
          </IconWrapper>
          <TextContent>
            <h1>Check your email</h1>
            <p>We've sent you a verification link to your email address</p>
            <SubText>
              Please click the link in the email to verify your account. If you don't see the email, check your spam folder.
            </SubText>
          </TextContent>
          {/* <LinkWrapper>
            <StyledButton onClick={openEmailClient}>
              Open Email
            </StyledButton>
          </LinkWrapper> */}
        </Card>
      </Wrapper>
    </Container>
  );
};

export default VerifyEmail;

const Container = styled.div`
  box-sizing: border-box;
  background-color: #efefef;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1350px;
  padding: 0 20px;
`;

const Card = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 100%;
  max-width: 450px;
  border-radius: 10px;
  padding: 40px 20px;
  margin: 0 auto;
  @media (max-width: 480px) {
    padding: 30px 15px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0fdf4;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
`;

const TextContent = styled.div`
  text-align: center;
  margin-bottom: 24px;
  h1 {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.4;
    margin-bottom: 8px;
    color: #111827;
    @media (max-width: 768px) {
      font-size: 1.8rem;
      line-height: 1.3;
    }
    @media (max-width: 480px) {
      font-size: 1.3rem;
      line-height: 1.2;
    }
  }
  p {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.6;
    color: rgb(97, 97, 97);
    @media (max-width: 768px) {
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
`;

const SubText = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5;
  color: rgb(97, 97, 97);
  margin-top: 16px;
`;

const LinkWrapper = styled.div`
  text-align: center;
`;

const StyledButton = styled.button`
  background-color: #16a34a;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #15803d;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;