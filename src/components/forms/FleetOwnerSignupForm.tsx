import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import CompanyBasicInfo from './sections/CompanyBasicInfo';
import AddressSection from './sections/AddressSection';
import UserAccountSection from './sections/UserAccountSection';
import FleetOwnerSection from './sections/FleetOwnerSection';
import { SignupSection, SignupContainer, Title, Subtitle, SubmitButton } from './StyledFormComponents';
import { FleetOwnerFormValues } from './types';
import { fleetOwnerValidationSchema } from './validationSchemas';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const FleetOwnerSignupForm = () => {
  const navigate = useNavigate();

  const formik = useFormik<FleetOwnerFormValues>({
    initialValues: {
      companyName: '',
      phoneNumber: '',
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'USA',
      },
      user: {
        fullname: '',
        email: '',
        password: '',
        appNotificationSetting: {
          emailNotificationEnabled: true,
          smsNotificationEnabled: false,
          appNotificationEnabled: true,
        },
      },
      operationalRegion: '',
      telematicSettings: {
        telematicProvider: '',
        telematicApiKey: '',
      },
    },
    validationSchema: fleetOwnerValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/fleetowners/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          navigate('/login?signup=success');
        } else {
          const errorMessage = data.message || 'An error occurred during signup';
          formik.setErrors(data.errors || {});
          alert(errorMessage);
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup. Please try again.');
      }
    },
  });

  return (
    <SignupSection>
      <SignupContainer>
        <Title>Create Your Fleet Owner Account</Title>
        <Subtitle>Start managing your fleet operations today</Subtitle>

        <form onSubmit={formik.handleSubmit}>
          <CompanyBasicInfo formik={formik} />
          <AddressSection formik={formik} />
          <UserAccountSection formik={formik} />
          <FleetOwnerSection formik={formik} />
          <SubmitButton type="submit">Create Account</SubmitButton>
        </form>
      </SignupContainer>
    </SignupSection>
  );
};

export default FleetOwnerSignupForm; 