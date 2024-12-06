import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Nav = styled.nav<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 4rem;
  background: ${props => props.scrolled ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' : 'transparent'};
  transition: background 0.3s ease;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    opacity: 0.9;
    
    &:hover {
      opacity: 1;
    }
  }
`;

const SignUpButton = styled(Link)`
  background: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav scrolled={scrolled}>
      <Logo to="/">TowUp</Logo>
      <NavLinks>
        <a href="#features">Features</a>
        <a href="#product">Product</a>
        <a href="#how-it-works">How it works</a>
        <a href="#repo-companies">Tow Trucks</a>
        <a href="#faqs">FAQs</a>
        <Link to="/login">Login</Link>
        <SignUpButton to="/signup">Sign Up</SignUpButton>
      </NavLinks>
    </Nav>
  );
};

export default Navigation;