import {
  GlobalStyle,
  Logo,
  MainContent,
  Navigation,
  NavLinks,
  PageWrapper,
} from "../components/layout/Global";
import RepoCompanySignupForm from "../components/forms/repo-company/RepoCompanySignUpForm";

const RepoCompanySignupPage = () => {

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
            <RepoCompanySignupForm />
        </MainContent>
      </PageWrapper>
    </>
  );
};

export default RepoCompanySignupPage;
