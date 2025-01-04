import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { GlobalStyles } from "./styles/GlobalStyles";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SignupConfirmationPage from "./pages/signup/SignUpConfirmationPage";
import EmailValidationPage from "./pages/signup/EmailValidationPage";
import ProfilePage from "./pages/ProfilePage";
import EditAccountDetails from "./pages/AccountEditPage";
import EditUserProfile from "./pages/UserEditPage";
import ConfigureNotifications from "./pages/AccountNotifications";
import EditTelematicsInfo from "./pages/EditTelematicsInfo";
import ApproveUsersPage from "./pages/ApproveUsersPage";
import TowTruckSignup from "./pages/TowTruckSignup";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="towtruck/signup" element={<TowTruckSignup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/signup-confirmation"
          element={<SignupConfirmationPage />}
        />
        <Route path="/verify-email" element={<EmailValidationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/account/edit" element={<EditAccountDetails />} />
        <Route path="/profile/user/edit" element={<EditUserProfile />} />
        <Route
          path="/profile/telematics/edit"
          element={<EditTelematicsInfo />}
        />
        <Route
          path="/profile/notifications"
          element={<ConfigureNotifications />}
        />
        <Route path="/approve/users" element={<ApproveUsersPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
