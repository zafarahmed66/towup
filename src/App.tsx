import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { GlobalStyles } from './styles/GlobalStyles';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import SignupConfirmationPage from './pages/signup/SignUpConfirmationPage';
import EmailValidationPage from './pages/signup/EmailValidationPage';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup-confirmation" element={<SignupConfirmationPage />} />
        <Route path="/verify-email" element={<EmailValidationPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
