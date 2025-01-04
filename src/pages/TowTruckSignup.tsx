import TowTruckOperatorSignUpForm from "@/components/forms/tow-truck-operator/TowTruckOperatorSignUpForm";
import { GlobalStyle, Logo, MainContent, Navigation, NavLinks, PageWrapper } from "@/components/layout/Global";

const TowTruckSignup = () => {

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
        <TowTruckOperatorSignUpForm />
          
        </MainContent>
      </PageWrapper>
    </>
  );
};

export default TowTruckSignup;

