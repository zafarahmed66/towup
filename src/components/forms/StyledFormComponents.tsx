import styled from 'styled-components';

export const FormSection = styled.div`
  margin-bottom: 2rem;
`;

export const FormGroupTitle = styled.h3`
  margin-bottom: 1rem;
`;

export const InputGroup = styled.div<{ hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  flex: 1;

  input, select {
    border-color: ${props => props.hasError ? '#dc3545' : '#ddd'};
    
    &:focus {
      border-color: ${props => props.hasError ? '#dc3545' : '#4CAF50'};
      box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(76, 175, 80, 0.1)'};
    }
  }
`;

export const InputRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #444;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  color: #444;
  background: white;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  color: #444;
  background: white;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  margin-top: 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #45a049;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? '#4CAF50' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 1px solid ${props => props.active ? '#4CAF50' : '#ddd'};

  &:hover {
    background: ${props => props.active ? '#45a049' : '#f5f5f5'};
    transform: translateY(-2px);
  }
`;

export const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: white;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

export const Title = styled.h1`
  color: #1e3c72;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const IconWrapper = styled.div`
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

export const FeatureCard = styled.div`
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

export const SignupContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin: 2rem;
`;

export const SignupSection = styled.section`
  min-height: calc(100vh - 80px);
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
  