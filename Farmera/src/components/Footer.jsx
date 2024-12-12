import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Sprout } from "lucide-react";
import styled from "styled-components";
import FooterSellSection from "./FooterSellSection"; // Import FooterSellSection

const FooterContainer = styled.footer`
  background-color: #f0fdf4;
  padding-top: 3rem;
  margin-top: auto;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BrandLink = styled(Link)`
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
    font-size: 1.25rem;
    font-weight: bold;
    color: #065f46;
  }
`;

const BrandDescription = styled.p`
  color: #4b5563;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: #16a34a;
    transition: color 0.3s;

    &:hover {
      color: #065f46;
    }

    .icon {
      height: 1.25rem;
      width: 1.25rem;
    }
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 1rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.5rem;

    a {
      text-decoration: none;
      color: #4b5563;
      transition: color 0.3s;

      &:hover {
        color: #16a34a;
      }
    }
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #4b5563;
    margin-bottom: 0.5rem;

    .icon {
      height: 1.25rem;
      width: 1.25rem;
      color: #16a34a;
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #bbf7d0;
    border-radius: 0.375rem;
    outline: none;
    font-size: 1rem;

    &:focus {
      border-color: #16a34a;
    }
  }

  button {
    background-color: #16a34a;
    color: #fff;
    padding: 0.5rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #15803d;
    }
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid #d1fae5;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const BottomText = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }

  a {
    font-size: 0.875rem;
    color: #4b5563;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #16a34a;
    }
  }
`;

export default function Footer() {
  return (
    <>
      {/* FooterSellSection above the main footer */}
      <FooterSellSection />

      <FooterContainer>
        <ContentWrapper>
          <Grid>
            {/* Brand Section */}
            <BrandSection>
              <BrandLink to="/">
                <Sprout className="logo" />
                <span>Farmera</span>
              </BrandLink>
              <BrandDescription>
                Connecting local farmers with consumers for fresher, healthier produce.
              </BrandDescription>
              <SocialLinks>
                <a href="#">
                  <Facebook className="icon" />
                </a>
                <a href="#">
                  <Twitter className="icon" />
                </a>
                <a href="#">
                  <Instagram className="icon" />
                </a>
              </SocialLinks>
            </BrandSection>

            {/* Quick Links */}
            <div>
              <SectionTitle>Quick Links</SectionTitle>
              <LinkList>
                <li>
                  <Link to="/store">Store</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/help/faq">Help Center</Link>
                </li>
                <li>
                  <Link to="/help/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/admin">Sell on Farmera</Link>
                </li>
              </LinkList>
            </div>

            {/* Contact Info */}
            <div>
              <SectionTitle>Contact Us</SectionTitle>
              <ContactList>
                <li>
                  <Mail className="icon" />
                  <p>
                    <a href="mailto:Hellofarmera@gmail.com">Hellofarmera@gmail.com</a>
                  </p>
                </li>
                <li>
                  <Phone className="icon" />
                  <span>
                    <p>
                      <a href="tel:+2349000000000">(+234) 09000 0000 00</a>
                    </p>
                    <p>
                      <a href="tel:+2349000000000">(+234) 09000 0000 00</a>
                    </p>
                  </span>
                </li>
                <li>
                  <MapPin className="icon" />
                  <span>
                    <p>Senator Abiru Innovations Labs</p>
                    <p>SAIL Labs, Ikorodu, Lagos</p>
                  </span>
                </li>
              </ContactList>
            </div>

            {/* Newsletter */}
            <div>
              <SectionTitle>Newsletter</SectionTitle>
              <p>Subscribe to get updates on new products and special offers.</p>
              <NewsletterForm>
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </NewsletterForm>
            </div>
          </Grid>

          {/* Bottom Bar */}
          <BottomBar>
            <BottomText>© 2024 Farmera. All rights reserved.</BottomText>
            <BottomLinks>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </BottomLinks>
          </BottomBar>
        </ContentWrapper>
      </FooterContainer>
    </>
  );
}
