import styled from 'styled-components';
import { 
  IoPersonAddOutline, 
  IoCarSportOutline, 
  IoGitCompareOutline,
  IoDocumentTextOutline,
  IoCardOutline 
} from 'react-icons/io5';

const Section = styled.section`
  padding: 8rem 4rem;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 6rem;
`;

const PhoneMockup = styled.div`
  flex: 1;
  position: relative;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 24px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: -20px;
    border-radius: 32px;
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(30, 60, 114, 0.1));
    z-index: -1;
  }
`;

const StepsContainer = styled.div`
  flex: 1;
  padding: 2rem;
`;

const Title = styled.h2`
  color: #1e3c72;
  font-size: 2.8rem;
  margin: 0.5rem 0 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.span`
  color: #4CAF50;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 3rem;
`;

const StepIcon = styled.div`
  background: #f0f7f0;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4CAF50;
  transition: all 0.3s ease;
  flex-shrink: 0;
`;

const StepItem = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
    transform: translateX(10px);
    
    ${StepIcon} {
      transform: scale(1.1);
      background: linear-gradient(135deg, #4CAF50, #45a049);
      
      svg {
        color: white;
      }
    }
  }
`;

const StepContent = styled.div`
  h3 {
    color: #1e3c72;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  
  p {
    color: #4a5568;
    line-height: 1.6;
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const steps = [
  {
    icon: IoPersonAddOutline,
    title: '1. Sign Up & Verification',
    description: 'Create your account and verify your fleet management credentials'
  },
  {
    icon: IoCarSportOutline,
    title: '2. Submit Recovery Request',
    description: 'Enter vehicle details and location for recovery assignment'
  },
  {
    icon: IoGitCompareOutline,
    title: '3. Automated Matching',
    description: 'Our system matches your request with nearby certified recovery operators'
  },
  {
    icon: IoDocumentTextOutline,
    title: '4. Documentation & Reports',
    description: 'Receive condition reports and recovery documentation digitally'
  },
  {
    icon: IoCardOutline,
    title: '5. Secure Payment Processing',
    description: 'Complete the recovery process with integrated secure payments'
  }
];

const HowItWorks = () => {
  return (
    <Section id="how-it-works">
      <Container>
        <PhoneMockup>
          <img src="/images/phone-mockup.png" alt="TowUp Mobile App" />
        </PhoneMockup>
        <StepsContainer>
          <Subtitle>EASY STEPS</Subtitle>
          <Title>How it works</Title>
          <Steps>
            {steps.map((step, index) => (
              <StepItem key={index}>
                <StepIcon>
                  {<step.icon size={24} />}
                </StepIcon>
                <StepContent>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </StepContent>
              </StepItem>
            ))}
          </Steps>
        </StepsContainer>
      </Container>
    </Section>
  );
};

export default HowItWorks;