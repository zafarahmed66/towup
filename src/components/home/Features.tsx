import styled from 'styled-components';
import { IoLocationOutline, IoNotificationsOutline, IoCardOutline } from 'react-icons/io5';

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  color: #1e3c72;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const IconWrapper = styled.div`
  background: linear-gradient(135deg, #e8f0fe 0%, #f8f9fa 100%);
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1;
  }
  
  svg {
    font-size: 2.5rem;
    color: #4CAF50;
    z-index: 2;
    transition: all 0.3s ease;
  }
`;

const FeatureCard = styled.div`
  padding: 2.5rem 2rem;
  background: white;
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  
  h3 {
    color: #1e3c72;
    font-size: 1.4rem;
    margin: 1rem 0;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  
  p {
    color: #4a5568;
    line-height: 1.6;
    font-size: 1.1rem;
    margin: 0;
    opacity: 0.9;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: #4CAF50;
    
    h3 {
      color: #4CAF50;
    }
    
    p {
      color: #2d3748;
      opacity: 1;
    }
    
    ${IconWrapper} {
      transform: scale(1.1);
      
      &::after {
        opacity: 1;
      }
      
      svg {
        color: white;
      }
    }
  }
`;

const features = [
  {
    icon: IoLocationOutline,
    title: 'Real-time Tracking',
    description: 'Monitor your fleet and recovery operations in real-time with our advanced telematics integration.'
  },
  {
    icon: IoNotificationsOutline,
    title: 'Smart Notifications',
    description: 'Stay informed with customizable email, SMS, and in-app notifications for every recovery milestone.'
  },
  {
    icon: IoCardOutline,
    title: 'Secure Payments',
    description: 'Integrated payment processing with Stripe for seamless and secure transactions.'
  }
];

const Features = () => {
  return (
    <FeaturesSection id="features">
      <Container>
        <Title>Why Choose TowUp?</Title>
        <Subtitle>
          Experience the future of fleet recovery with our innovative platform
        </Subtitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <IconWrapper>
                <feature.icon size={40} />
              </IconWrapper>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
};

export default Features;