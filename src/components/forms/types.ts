import { FormikProps } from 'formik';

// Common base interfaces
interface BaseFormValues {
  companyName: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  user: {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
    appNotificationSetting: {
      emailNotificationEnabled: boolean;
      smsNotificationEnabled: boolean;
      appNotificationEnabled: boolean;
    };
  };
}

export interface LogInFormValues {
  email: string;
  password: string;
}

export interface FleetOwnerFormValues extends BaseFormValues {
  operationalRegion: string;
  telematicSettings: {
    telematicProvider?: string;
    telematicApiKey?: string;
  };
}

export interface RepoCompanyFormValues extends BaseFormValues {}

export type FormikFleetOwnerType = FormikProps<FleetOwnerFormValues>;
export type FormikRepoCompanyType = FormikProps<RepoCompanyFormValues>; 