import SignInForm from "../components/forms/signin/SignInForm";
import { GlobalStyle, Logo, MainContent, Navigation, NavLinks, PageWrapper } from "../components/layout/Global";

const LoginPage = () => {

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <Navigation>
          <Logo href="/">TowUp</Logo>
          <NavLinks>
            <a href="/signup">Signup</a>
          </NavLinks>
        </Navigation>
        <MainContent>
            <SignInForm></SignInForm>
        </MainContent>
      </PageWrapper>
    </>
  );
};

export default LoginPage;