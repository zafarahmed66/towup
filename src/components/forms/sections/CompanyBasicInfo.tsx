import { FormikFleetOwnerType, FormikRepoCompanyType } from '../types';
import { FormSection, FormGroupTitle, InputGroup, Label, Input, ErrorMessage } from '../StyledFormComponents';

interface CompanyBasicInfoProps {
  formik: FormikFleetOwnerType | FormikRepoCompanyType;
}

const CompanyBasicInfo = ({ formik }: CompanyBasicInfoProps) => {
  return (
    <FormSection>
      <FormGroupTitle>Company Information</FormGroupTitle>
      <InputGroup>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          {...formik.getFieldProps('companyName')}
        />
        {formik.touched.companyName && formik.errors.companyName && (
          <ErrorMessage>{formik.errors.companyName}</ErrorMessage>
        )}
      </InputGroup>
      <InputGroup>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          {...formik.getFieldProps('phoneNumber')}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <ErrorMessage>{formik.errors.phoneNumber}</ErrorMessage>
        )}
      </InputGroup>
    </FormSection>
  );
};

export default CompanyBasicInfo; 