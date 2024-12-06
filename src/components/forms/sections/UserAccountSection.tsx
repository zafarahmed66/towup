import { FormSection, FormGroupTitle, InputGroup, Label, Input } from '../StyledFormComponents';
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
          <div className="error">{formik.errors.user.fullname}</div>
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
          <div className="error">{formik.errors.user.email}</div>
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
          <div className="error">{formik.errors.user.password}</div>
        )}
      </InputGroup>
    </FormSection>
  );
};

export default UserAccountSection; 