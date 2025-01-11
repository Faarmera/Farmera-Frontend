// import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminProductList from "./components/AdminProductList";
import AdminStats from "./components/AdminStats";
import styled from "styled-components";


export default function Dashboard() {
  const { state: authState } = useAuth();

  if (!authState.isAuthenticated) {
    return (
      <Container>
        <Wrapper>
          <CenteredMessage>
            <h2>Please Sign In</h2>
            <p>You need to be signed in to access the dashboard.</p>
          </CenteredMessage>
        </Wrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Wrapper>
        <WelcomeSection>
          <h1>Welcome, {authState.user?.firstname}</h1>
          <p>Manage your products and view your store's performance</p>
        </WelcomeSection>

        <AdminStats />
        <AdminProductList />
      </Wrapper>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding-top: 6rem;
  padding: 1rem;
  background-color: #f9fafb;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CenteredMessage = styled.div`
  text-align: center;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    font-size: 1rem;
  }
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6b7280;
    font-size: 1rem;
  }
`;

