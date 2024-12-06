import { useState } from 'react';
import styled from 'styled-components';
import { IoChevronDownOutline } from 'react-icons/io5';

const Section = styled.section`
  padding: 8rem 4rem;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
`;

const Subtitle = styled.span`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  display: block;
`;

const Title = styled.h2`
  color: #1e3c72;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const FAQGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  position: relative;
`;

const FAQItem = styled.div`
  border: 1px solid rgba(76, 175, 80, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
    border-color: #4CAF50;
  }
`;

const Question = styled.div<{ isOpen: boolean }>`
  padding: 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: ${props => props.isOpen ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(30, 60, 114, 0.1))' : 'white'};
  transition: all 0.3s ease;
  
  h3 {
    font-size: 1.2rem;
    color: ${props => props.isOpen ? '#4CAF50' : '#1e3c72'};
    font-weight: 600;
    margin: 0;
    transition: color 0.3s ease;
  }
  
  svg {
    color: #4CAF50;
    transition: all 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const Answer = styled.div<{ isOpen: boolean }>`
  padding: ${props => props.isOpen ? '0 1.75rem 1.75rem' : '0 1.75rem'};
  max-height: ${props => props.isOpen ? '300px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.4s ease;
  
  p {
    color: #4a5568;
    line-height: 1.8;
    font-size: 1.1rem;
    margin: 0;
  }
`;

const faqItems = [
  {
    question: 'How does the automated assignment system work?',
    answer: 'Our system uses advanced algorithms to match recovery requests with the nearest available certified operators, considering factors like location, vehicle type, and operator expertise.'
  },
  {
    question: 'What documentation is required for repossession companies?',
    answer: 'Companies need to provide business licenses, insurance certificates, towing permits, and proof of compliance with state regulations. All documents can be uploaded during the application process.'
  },
  {
    question: 'How are payments processed on the platform?',
    answer: 'We use Stripe for secure payment processing. Payments are automatically processed upon completion of recovery operations and submission of required documentation.'
  },
  {
    question: 'What kind of real-time updates are provided?',
    answer: 'Our platform provides GPS tracking, status updates, ETA notifications, and instant alerts for key milestones throughout the recovery process.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faqs">
      <Container>
        <Header>
          <Subtitle>FAQ</Subtitle>
          <Title>Frequently Asked Questions</Title>
        </Header>
        <FAQGrid>
          {faqItems.map((item, index) => (
            <FAQItem key={index}>
              <Question 
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              >
                <h3>{item.question}</h3>
                <IoChevronDownOutline size={24} />
              </Question>
              <Answer isOpen={openIndex === index}>
                <p>{item.answer}</p>
              </Answer>
            </FAQItem>
          ))}
        </FAQGrid>
      </Container>
    </Section>
  );
};

export default FAQ;