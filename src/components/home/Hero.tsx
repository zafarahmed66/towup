import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8rem 4rem 4rem;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  min-height: 80vh;
  gap: 4rem;
`;

const HeroContent = styled.div`
  max-width: 45%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  background-image: url('/images/tow-truck1.jpeg');
  background-size: cover;
  background-position: center;
  min-height: 80vh;
  width: 50%;
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.8;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: flex-start;
  width: 100%;
  margin-top: 2rem;
  padding-left: 3rem;
`;

const PrimaryButton = styled(Link)`
  background: #4CAF50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SecondaryButton = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <h1>Streamline Your Fleet Recovery Operations</h1>
        <HeroSubtitle>
          Connect fleet owners with trusted recovery professionals through our intelligent dispatch platform. 
          Save time, reduce costs, and improve recovery rates.
        </HeroSubtitle>
        <CTAButtons>
          <PrimaryButton to="/signup?type=fleet">Start Free Trial</PrimaryButton>
          <SecondaryButton to="#demo">Watch Demo</SecondaryButton>
        </CTAButtons>
      </HeroContent>
      <HeroImage />
    </HeroSection>
  );
};

export default Hero;