import { GlobalStyle, Logo, MainContent, Navigation, NavLinks, PageWrapper } from "../components/layout/Global";
import { useSearchParams } from 'react-router-dom';
import FleetOwnerSignupForm from '../components/forms/FleetOwnerSignupForm';
import RepoCompanySignupForm from '../components/forms/RepoCompanySignupForm';

const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'fleet';

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <Navigation>
          <Logo href="/">TowUp</Logo>
          <NavLinks>
            <a href="/login">Login</a>
          </NavLinks>
        </Navigation>
        <MainContent>
          {type === 'fleet' ? <FleetOwnerSignupForm /> : <RepoCompanySignupForm />}
        </MainContent>
      </PageWrapper>
    </>
  );
};

export default SignupPage;

