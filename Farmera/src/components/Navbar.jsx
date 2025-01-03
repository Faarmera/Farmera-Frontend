import React, { useState } from "react";
import { Search, ShoppingCart, Menu, X, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

// Styled Components
const NavbarContainer = styled.nav`
  background-color: #f0fdf4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* position: fixed; */
  width: 100%;
  z-index: 50;
`;

const NavbarWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  .logo {
    height: 2rem;
    width: 2rem;
    color: #16a34a;
  }

  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #065f46;
  }
`;

const DesktopMenu = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

const NavContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const NavTrigger = styled.div`
  text-decoration: none;
  cursor: pointer;
  color: #15803d;
  transition: color 0.3s;

  &:hover {
    color: #065f46;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 150px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #15803d;
  transition: color 0.3s;

  &:hover {
    color: #065f46;
  }
`;

const SearchContainer = styled.div`
  position: relative;

  button {
    background: none;
    border: none;
    color: #15803d;
    cursor: pointer;

    &:hover {
      color: #065f46;
    }
  }
`;

const SearchDropdown = styled.div`
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 16rem;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #bbf7d0;
    border-radius: 0.375rem;
    outline: none;

    &:focus {
      border-color: #16a34a;
    }
  }
`;

const CartLink = styled(Link)`
  position: relative;
  color: #15803d;

  &:hover {
    color: #065f46;
  }

  .cart-icon {
    height: 1.25rem;
    width: 1.25rem;
  }

  .cart-badge {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    background-color: #16a34a;
    color: white;
    font-size: 0.75rem;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SignInButton = styled(Link)`
  text-decoration: none;
  color: #15803d;

  &:hover {
    color: #065f46;
  }
`;

const SignUpButton = styled(Link)`
  background-color: #16a34a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #15803d;
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  background: none;
  border: none;
  color: #15803d;

  &:hover {
    color: #065f46;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  background-color: #f0fdf4;
  padding-bottom: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #15803d;
  border-radius: 0.375rem;

  &:hover {
    background-color: #dcfce7;
    color: #065f46;
  }
`;

// Component
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
  
    const handleMouseEnter = () => {
      setIsDropdownOpen(true);
    };
  
    const handleMouseLeave = () => {
      setIsDropdownOpen(false);
    };
  
    const navigateToPage = (path) => {
      navigate(path);
      setIsDropdownOpen(false);
    };

  return (
    <NavbarContainer>
      <NavbarWrapper>
        {/* Brand */}
        <Brand to="/">
          <Sprout className="logo" />
          <span>Farmera</span>
        </Brand>

        {/* Desktop Menu */}
        <DesktopMenu>
          <NavLink to="/buyer-store">Store</NavLink>
          <NavLink to="/about">About Us</NavLink>
          {/* <NavLink to="/help">Help</NavLink> */}

              <NavContainer 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                  <NavLink>Help</NavLink>
                  <DropdownMenu isOpen={isDropdownOpen}>
                    <DropdownItem onClick={() => navigateToPage('help/faq')}>
                      FAQ
                    </DropdownItem>
                    <DropdownItem onClick={() => navigateToPage('/help/contact')}>
                      Contact
                    </DropdownItem>
                  </DropdownMenu>
                </NavContainer>

          <SearchContainer>
            <button onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="h-5 w-5" />
            </button>
            {searchOpen && (
              <SearchDropdown>
                <input type="text" placeholder="Search products..." />
              </SearchDropdown>
            )}
          </SearchContainer>

          <CartLink to="/buyer-cart">
            <ShoppingCart className="cart-icon" />
            <span className="cart-badge">0</span>
          </CartLink>

          <AuthButtons>
            <SignInButton to="/signin">Sign In</SignInButton>
            <SignUpButton to="/signup">Create Account</SignUpButton>
          </AuthButtons>
        </DesktopMenu>

        {/* Mobile Menu Button */}
        <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </MobileMenuButton>
      </NavbarWrapper>

      {/* Mobile Menu */}
      {isOpen && (
        <MobileMenu>
          <MobileMenuLink to="/buyer-store">Store</MobileMenuLink>
          <MobileMenuLink to="/about">About Us</MobileMenuLink>
          <MobileMenuLink to="/help/contact">Help</MobileMenuLink>
          <MobileMenuLink to="/help/faq">FAQ</MobileMenuLink>
          <MobileMenuLink to="/signin">Sign In</MobileMenuLink>
          <MobileMenuLink to="/signup">Create Account</MobileMenuLink>
        </MobileMenu>
      )}
    </NavbarContainer>
  );
}
