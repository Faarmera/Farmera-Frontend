import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Check, X, Mail, Loader } from 'lucide-react';

const EmailVerification = () => {
  const [status, setStatus] = useState('verifying');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { userId, uniqueString } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`https://farmera-eyu3.onrender.com/api/v1/auth/verify/${userId}/${uniqueString}`);
        const data = await response.json();
        
        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('failed');
      }
    };

    verifyEmail();
  }, [userId, uniqueString]);

  const handleResendVerification = async () => {
    setStatus('resending');
    try {
      const response = await fetch('https://farmera-eyu3.onrender.com/api/v1/auth/resendVerificationEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setStatus('resent');
      } else {
        setStatus('resend-failed');
      }
    } catch (error) {
      console.error('Resend error:', error);
      setStatus('resend-failed');
    }
  };

  const openEmailClient = () => {
    window.location.href = "mailto:";
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <>
            <IconWrapper>
              <Loader size={32} className="animate-spin" />
            </IconWrapper>
            <TextContent>
              <h1>Verifying your email...</h1>
              <p>Please wait while we verify your email address.</p>
            </TextContent>
          </>
        );

      case 'success':
        return (
          <>
            <IconWrapper success>
              <Check size={32} color="#16a34a" />
            </IconWrapper>
            <TextContent>
              <h1>Email Verified Successfully!</h1>
              <p>Your email has been verified. You can now sign in to your account.</p>
            </TextContent>
            <ButtonWrapper>
              <StyledButton onClick={() => navigate('/signin')}>
                Back to Sign In
              </StyledButton>
            </ButtonWrapper>
          </>
        );

      case 'failed':
        return (
          <>
            <IconWrapper failed>
              <X size={32} color="#dc2626" />
            </IconWrapper>
            <TextContent>
              <h1>Verification Failed</h1>
              <p>Sorry, we could not verify your email. Please try resending the verification link.</p>
              <InputWrapper>
                <StyledInput
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputWrapper>
            </TextContent>
            <ButtonWrapper>
              <StyledButton onClick={handleResendVerification}>
                Resend Verification Link
              </StyledButton>
            </ButtonWrapper>
          </>
        );

      case 'resending':
        return (
          <>
            <IconWrapper>
              <Loader size={32} className="animate-spin" />
            </IconWrapper>
            <TextContent>
              <h1>Resending Verification Link</h1>
              <p>Please wait while we send you a new verification link...</p>
            </TextContent>
          </>
        );

      case 'resent':
        return (
          <>
            <IconWrapper success>
              <Mail size={32} color="#16a34a" />
            </IconWrapper>
            <TextContent>
              <h1>Verification Link Sent!</h1>
              <p>Please check your email for the new verification link.</p>
            </TextContent>
            <ButtonWrapper>
              <StyledButton onClick={openEmailClient}>
                Open Email
              </StyledButton>
            </ButtonWrapper>
          </>
        );

      case 'resend-failed':
        return (
          <>
            <IconWrapper failed>
              <X size={32} color="#dc2626" />
            </IconWrapper>
            <TextContent>
              <h1>Couldn't Resend Verification</h1>
              <p>Sorry, we couldn't send the verification email. Please try again or contact support.</p>
            </TextContent>
            <ButtonWrapper>
              <StyledButton onClick={() => setStatus('failed')}>
                Try Again
              </StyledButton>
            </ButtonWrapper>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <Card>
        {renderContent()}
      </Card>
    </Container>
  );
};

export default EmailVerification;

const Container = styled.div`
  box-sizing: border-box;
  background-color: #efefef;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: ${props => 
    props.success ? '#f0fdf4' : 
    props.failed ? '#fef2f2' : 
    '#f3f4f6'};
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

const ButtonWrapper = styled.div`
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

const InputWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #16a34a;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;