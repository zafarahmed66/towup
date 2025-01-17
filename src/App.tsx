import {  Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
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
import EditOperationalRegions from "./pages/EditRegion";
import EditDocumentsPage from "./pages/EditDocumentPage";
import FleetOwnerSignupPage from "./pages/FleetOwnerSignup";
import RepoCompanySignupPage from "./pages/RepoCompanySignup";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fleetowner/signup" element={<FleetOwnerSignupPage />} />
        <Route path="/repocompany/signup" element={<RepoCompanySignupPage />} />
        <Route path="/towtruckop/signup" element={<TowTruckSignup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/signup-confirmation"
          element={<SignupConfirmationPage />}
        />
        <Route path="/verify-email" element={<EmailValidationPage />} />
        <Route path="/towtruckop/profile" element={<ProfilePage />} />
        <Route path="/repocompany/profile" element={<ProfilePage />} />
        <Route path="/fleetowner/profile" element={<ProfilePage />} />
        <Route path="/profile/account/edit" element={<EditAccountDetails />} />
        <Route path="/profile/user/edit" element={<EditUserProfile />} />
        <Route
          path="/profile/regions/edit"
          element={<EditOperationalRegions />}
        />
        <Route path="/profile/documents/edit" element={<EditDocumentsPage />} />
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
    </>
  );
}

export default App;
