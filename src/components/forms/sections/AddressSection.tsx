import { FormSection, FormGroupTitle, InputGroup, InputRow, Label, Input, ErrorMessage } from '../StyledFormComponents';
import { FormikFleetOwnerType, FormikRepoCompanyType } from '../types';

interface AddressSectionProps {
  formik: FormikFleetOwnerType | FormikRepoCompanyType;
}

const AddressSection = ({ formik }: AddressSectionProps) => {
  return (
    <FormSection>
      <FormGroupTitle>Address</FormGroupTitle>
      <InputGroup>
        <Label htmlFor="address.street">Street Address</Label>
        <Input
          id="address.street"
          {...formik.getFieldProps('address.street')}
        />
        {formik.touched.address?.street && formik.errors.address?.street && (
          <ErrorMessage>{formik.errors.address.street}</ErrorMessage>
        )}
      </InputGroup>
      <InputRow>
        <InputGroup>
          <Label htmlFor="address.city">City</Label>
          <Input
            id="address.city"
            {...formik.getFieldProps('address.city')}
          />
          {formik.touched.address?.city && formik.errors.address?.city && (
            <ErrorMessage>{formik.errors.address.city}</ErrorMessage>
          )}
        </InputGroup>
        <InputGroup>
          <Label htmlFor="address.state">State</Label>
          <Input
            id="address.state"
            {...formik.getFieldProps('address.state')}
          />
          {formik.touched.address?.state && formik.errors.address?.state && (
            <ErrorMessage>{formik.errors.address.state}</ErrorMessage>
          )}
        </InputGroup>
      </InputRow>
      <InputRow>
        <InputGroup>
          <Label htmlFor="address.postalCode">Postal Code</Label>
          <Input
            id="address.postalCode"
            {...formik.getFieldProps('address.postalCode')}
          />
          {formik.touched.address?.postalCode && formik.errors.address?.postalCode && (
            <ErrorMessage>{formik.errors.address.postalCode}</ErrorMessage>
          )}
        </InputGroup>
        <InputGroup>
          <Label htmlFor="address.country">Country</Label>
          <Input
            id="address.country"
            {...formik.getFieldProps('address.country')}
            defaultValue="USA"
          />
        </InputGroup>
      </InputRow>
    </FormSection>
  );
};

export default AddressSection; 