import React from 'react';
import styled from 'styled-components';
import { Mail } from 'lucide-react';

const CheckEmail = () => {
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
            <p>Password reset instructions have been send to your email address</p>
            <SubText>
                If you don't see the email, check your spam folder.
            </SubText>
          </TextContent>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default CheckEmail;

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
