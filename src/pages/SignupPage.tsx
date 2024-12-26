import { GlobalStyle, Logo, MainContent, Navigation, NavLinks, PageWrapper } from "../components/layout/Global";
import { useSearchParams } from 'react-router-dom';
import FleetOwnerSignupForm from '../components/forms/fleet-owner/FleetOwnerSignUpForm';
import RepoCompanySignupForm from '../components/forms/repo-company/RepoCompanySignUpForm';
import TowTruckOperatorSignupPage from "@/components/forms/tow-truck-operator/TowTruckOperatorSignUpForm";

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
          {type === 'fleet' ? <FleetOwnerSignupForm /> : (type === "repo" ? <RepoCompanySignupForm /> : <TowTruckOperatorSignupPage /> )}

          
        </MainContent>
      </PageWrapper>
    </>
  );
};

export default SignupPage;

