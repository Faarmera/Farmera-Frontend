import React, { useState } from "react";
import { Search, ShoppingCart, Menu, X, Sprout } from "lucide-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  text-decoration: none;

  span {
    color: #16a34a;
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  color: #4b5563;
  transition: color 0.3s;

  &:hover {
    color: #111827;
  }
`;

const SearchContainer = styled.div`
  position: relative;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const SearchInput = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.5rem;

  input {
    width: 200px;
    padding: 0.5rem;
    border: none;
    outline: none;
    font-size: 0.875rem;
  }
`;

const CartButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #111827;
  position: relative;
`;

const CartCount = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: #ef4444;
  color: #fff;
  font-size: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SignInButton = styled(Link)`
  text-decoration: none;
  color: #4b5563;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9fafb;
  }
`;

const SignUpButton = styled(Link)`
  text-decoration: none;
  color: #fff;
  padding: 0.5rem 1rem;
  background-color: #16a34a;
  border-radius: 0.375rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #15803d;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  color: #4b5563;

  &:hover {
    color: #111827;
  }
`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Nav>
      <Container>
        <NavContent>
          <Logo to="/">
            <Sprout size={32} />
            <span>Farmera</span>
          </Logo>

          <DesktopMenu>
            <NavLink to="/store">Store</NavLink>
            <NavLink to="/about">About Us</NavLink>

            <SearchContainer>
              <button onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={20} />
              </button>
              {searchOpen && (
                <SearchInput>
                  <input type="text" placeholder="Search products..." />
                </SearchInput>
              )}
            </SearchContainer>

            <CartButton to="/cart">
              <ShoppingCart size={20} />
              <CartCount>0</CartCount>
            </CartButton>

            <AuthButtons>
              <SignInButton to="/signin">Sign In</SignInButton>
              <SignUpButton to="/signup">Create Account</SignUpButton>
            </AuthButtons>
          </DesktopMenu>

          <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </NavContent>
      </Container>

      {isOpen && (
        <MobileMenu>
          <MobileNavLink to="/store">Store</MobileNavLink>
          <MobileNavLink to="/about">About Us</MobileNavLink>
          <MobileNavLink to="/signin">Sign In</MobileNavLink>
          <MobileNavLink to="/signup">Create Account</MobileNavLink>
        </MobileMenu>
      )}
    </Nav>
  );
}
