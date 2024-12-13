import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import CompanyBasicInfo from './sections/CompanyBasicInfo';
import AddressSection from './sections/AddressSection';
import UserAccountSection from './sections/UserAccountSection';
import { SignupSection, SignupContainer, Title, Subtitle, SubmitButton } from './StyledFormComponents';
import { RepoCompanyFormValues } from './types';
import { signUpAsRepoCompany } from '../../controller/authController';

const validationSchema = Yup.object({
  companyName: Yup.string().required('Company name is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  address: Yup.object({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postalCode: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Country is required'),
  }),
  user: Yup.object({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  }),
});

const RepoCompanySignupForm = () => {
  const navigate = useNavigate();

  const formik = useFormik<RepoCompanyFormValues>({
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
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let forms = {...values};
        delete forms.user.confirmPassword
        const response = await signUpAsRepoCompany(forms)

        if (response) {
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
        <Title>Create Your Recovery Company Account</Title>
        <Subtitle>Start managing your recovery operations today</Subtitle>

        <form onSubmit={formik.handleSubmit}>
          <CompanyBasicInfo formik={formik} />
          <AddressSection formik={formik} />
          <UserAccountSection formik={formik} />
          <SubmitButton type="submit">Create Account</SubmitButton>
        </form>
      </SignupContainer>
    </SignupSection>
  );
};

export default RepoCompanySignupForm; 