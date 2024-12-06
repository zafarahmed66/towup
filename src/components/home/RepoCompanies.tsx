import styled from 'styled-components';

const Section = styled.section`
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

const ApplyButton = styled.a`
  display: inline-block;
  background: #4CAF50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background: #45a049;
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const VideoCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .step {
    color: #4CAF50;
    font-weight: 600;
    font-size: 1.1rem;
    display: block;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #1e3c72;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
`;

const RepoCompanies = () => {
  return (
    <Section id="repo-companies">
      <Container>
        <Title>Join Our Network of Recovery Professionals</Title>
        <Subtitle>
          Partner with TowUp to grow your business and access a steady stream of recovery assignments
        </Subtitle>
        <VideoGrid>
          <VideoCard>
            <span className="step">01</span>
            <h3>Increased Revenue</h3>
            <p>Access a larger customer base and receive regular recovery assignments</p>
          </VideoCard>
          <VideoCard>
            <span className="step">02</span>
            <h3>Streamlined Operations</h3>
            <p>Manage all your assignments, documentation, and payments in one place with our user-friendly platform.</p>
          </VideoCard>
          <VideoCard>
            <span className="step">03</span>
            <h3>Professional Network</h3>
            <p>Join our network of certified recovery professionals and build long-term relationships with major fleet operators.</p>
          </VideoCard>
        </VideoGrid>
        <ApplyButton href="/signup?type=repo">Apply Now</ApplyButton>
      </Container>
    </Section>
  );
};

export default RepoCompanies;