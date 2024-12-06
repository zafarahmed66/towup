import Navigation from '../components/layout/Navigation';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Product from '../components/home/Product';
import RepoCompanies from '../components/home/RepoCompanies';
import FAQ from '../components/home/FAQ';
//import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <main>
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <Product />
      <RepoCompanies />
      <FAQ />
      {/* <Footer /> */}
    </main>
  );
};

export default LandingPage;