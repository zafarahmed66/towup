import { FormikFleetOwnerType, FormikRepoCompanyType } from '../types';
import { FormSection, FormGroupTitle, InputGroup, Label, Input } from '../StyledFormComponents';

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
      </InputGroup>
      <InputGroup>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          {...formik.getFieldProps('phoneNumber')}
        />
      </InputGroup>
    </FormSection>
  );
};

export default CompanyBasicInfo; 