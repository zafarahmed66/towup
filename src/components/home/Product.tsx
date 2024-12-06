import styled from 'styled-components';

const ProductSection = styled.section`
  padding: 8rem 4rem;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 30px 30px;
    opacity: 0.1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 6rem;
  position: relative;
  z-index: 1;
`;

const ProductContent = styled.div`
  flex: 1;
  
  h2 {
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 3rem;
    margin-bottom: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
    text-shadow: none;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
    font-size: 1.2rem;
    line-height: 1.8;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  flex: 1;
  transition: all 0.5s ease;
  transform-style: preserve-3d;
  
  &:hover {
    transform: translateY(-10px) rotateY(-5deg);
  }
  
  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Product = () => {
  return (
    <ProductSection id="product">
      <Container>
        <ProductContent>
          <h2>Powerful Fleet Recovery Platform</h2>
          <p>
            Our platform streamlines the entire recovery process, from initial request 
            to final documentation. With integrated telematics and real-time tracking, 
            you'll always know the status of your vehicles.
          </p>
          <p>
            Advanced features include automated dispatch, digital condition reports, 
            and secure payment processing - everything you need in one platform.
          </p>
        </ProductContent>
        <ProductImage>
          <img src="/images/product-dashboard.png" alt="TowUp Dashboard" />
        </ProductImage>
      </Container>
    </ProductSection>
  );
};

export default Product;