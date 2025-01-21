import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
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
import ApproveDocumentsPage from "./pages/ApproveDocumentsPage";
import NotFoundPage from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fleetowner/signup" element={<FleetOwnerSignupPage />} />
        <Route path="/repocompany/signup" element={<RepoCompanySignupPage />} />
        <Route path="/towtruckop/register" element={<TowTruckSignup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/signup-confirmation"
          element={<SignupConfirmationPage />}
        />
        <Route path="/verify-email" element={<EmailValidationPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/towtruckop/profile" element={<ProfilePage />} />
          <Route path="/repocompany/profile" element={<ProfilePage />} />
          <Route path="/fleetowner/profile" element={<ProfilePage />} />
          <Route
            path="/profile/account/edit"
            element={<EditAccountDetails />}
          />
          <Route path="/profile/user/edit" element={<EditUserProfile />} />
          <Route
            path="/profile/regions/edit"
            element={<EditOperationalRegions />}
          />
          <Route
            path="/profile/documents/edit"
            element={<EditDocumentsPage />}
          />
          <Route
            path="/profile/telematics/edit"
            element={<EditTelematicsInfo />}
          />
          <Route
            path="/profile/notifications"
            element={<ConfigureNotifications />}
          />
        </Route>

        <Route element={<PrivateRoute requiredRole="SYS_ADMIN" />}>
          <Route path="/approve/users" element={<ApproveUsersPage />} />
          <Route path="/approve/documents" element={<ApproveDocumentsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
