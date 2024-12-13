import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import CompanyBasicInfo from './sections/CompanyBasicInfo';
import AddressSection from './sections/AddressSection';
import UserAccountSection from './sections/UserAccountSection';
import FleetOwnerSection from './sections/FleetOwnerSection';
import { SignupSection, SignupContainer, Title, Subtitle, SubmitButton } from './StyledFormComponents';
import { FleetOwnerFormValues } from './types';
import { fleetOwnerValidationSchema } from './validationSchemas';
import { signUpAsFleetOwner } from '../../controller/authController'

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
        confirmPassword: '',
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
        let forms = {...values};
        delete forms.user.confirmPassword
        if(!forms.telematicSettings.telematicProvider) delete forms.telematicSettings.telematicProvider
        const response = await signUpAsFleetOwner(forms)
        if (response?.fleetOwnerDTO && response?.userDTO) {
          toast.success("You've successfully signed up!")
          navigate('/login?signup=success');
        } else {
          toast.error('An error occurred during signup. Please try again.');
        }
      } catch (error: any) {
        console.error('Signup error:', error);
        toast.error(error.message);
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