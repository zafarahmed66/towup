import { FormSection, FormGroupTitle, InputGroup, Label, Input, ErrorMessage } from '../StyledFormComponents';
import { FormikFleetOwnerType, FormikRepoCompanyType } from '../types';

interface UserAccountSectionProps {
  formik: FormikFleetOwnerType | FormikRepoCompanyType;
}

const UserAccountSection = ({ formik }: UserAccountSectionProps) => {
  return (
    <FormSection>
      <FormGroupTitle>User Account</FormGroupTitle>
      <InputGroup>
        <Label htmlFor="user.fullname">Full Name</Label>
        <Input
          id="user.fullname"
          {...formik.getFieldProps('user.fullname')}
        />
        {formik.touched.user?.fullname && formik.errors.user?.fullname && (
          <ErrorMessage>{formik.errors.user.fullname}</ErrorMessage>
        )}
      </InputGroup>
      <InputGroup>
        <Label htmlFor="user.email">Email</Label>
        <Input
          id="user.email"
          type="email"
          {...formik.getFieldProps('user.email')}
        />
        {formik.touched.user?.email && formik.errors.user?.email && (
          <ErrorMessage>{formik.errors.user.email}</ErrorMessage>
        )}
      </InputGroup>
      <InputGroup>
        <Label htmlFor="user.password">Password</Label>
        <Input
          id="user.password"
          type="password"
          {...formik.getFieldProps('user.password')}
        />
        {formik.touched.user?.password && formik.errors.user?.password && (
          <ErrorMessage>{formik.errors.user.password}</ErrorMessage>
        )}
      </InputGroup>
      <InputGroup>
        <Label htmlFor="user.password">Confirm Password</Label>
        <Input
          id="user.confirmPassword"
          type="password"
          {...formik.getFieldProps('user.confirmPassword')}
        />
        {formik.touched.user?.confirmPassword && formik.errors.user?.confirmPassword && (
          <ErrorMessage>{formik.errors.user.confirmPassword}</ErrorMessage>
        )}
      </InputGroup>
    </FormSection>
  );
};

export default UserAccountSection; 