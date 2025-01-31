import * as Yup from 'yup';

const baseValidationSchema = {
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
    password: Yup.string().min(12, 'Password must be at least 12 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  }),
};

export const fleetOwnerValidationSchema = Yup.object({
  ...baseValidationSchema,
  operationalRegion: Yup.string().required('Operational region is required'),
  telematicSettings: Yup.object({
    telematicProvider: Yup.string().optional(),
    telematicApiKey: Yup.string().optional(),
  }),
});

export const repoCompanyValidationSchema = Yup.object({
  ...baseValidationSchema,
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});