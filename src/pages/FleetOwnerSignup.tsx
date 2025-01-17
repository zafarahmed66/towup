import {
  GlobalStyle,
  Logo,
  MainContent,
  Navigation,
  NavLinks,
  PageWrapper,
} from "../components/layout/Global";
import FleetOwnerSignupForm from "../components/forms/fleet-owner/FleetOwnerSignUpForm";

const FleetOwnerSignupPage = () => {
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
          <FleetOwnerSignupForm />
        </MainContent>
      </PageWrapper>
    </>
  );
};

export default FleetOwnerSignupPage;
