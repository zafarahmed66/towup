import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    display: block !important;
    align-items: initial !important;
    justify-content: initial !important;
    background-image: none !important;
  }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Navigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

export const Logo = styled.a`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
`;

export const NavLinks = styled.div`
  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
`;

export const MainContent = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 80px;
`;