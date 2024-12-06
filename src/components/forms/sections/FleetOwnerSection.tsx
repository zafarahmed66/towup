import { FormSection, FormGroupTitle, InputGroup, Label, Select, Input } from '../StyledFormComponents';
import { FormikFleetOwnerType } from '../types';

interface FleetOwnerSectionProps {
  formik: FormikFleetOwnerType;
}

const FleetOwnerSection = ({ formik }: FleetOwnerSectionProps) => {
  return (
    <FormSection>
      <FormGroupTitle>Fleet Settings</FormGroupTitle>
      <InputGroup>
        <Label htmlFor="operationalRegion">Operational Region</Label>
        <Select
          id="operationalRegion"
          {...formik.getFieldProps('operationalRegion')}
        >
          <option value="">Select a region</option>
          <option value="NEW_YORK_METRO">New York Metro</option>
          <option value="LOS_ANGELES">Los Angeles</option>
          <option value="CHICAGO">Chicago</option>
        </Select>
      </InputGroup>
      <InputGroup>
        <Label htmlFor="telematicSettings.telematicProvider">Telematic Provider</Label>
        <Select
          id="telematicSettings.telematicProvider"
          {...formik.getFieldProps('telematicSettings.telematicProvider')}
        >
          <option value="">Select a provider</option>
          <option value="SMARTCAR">Smartcar</option>
          <option value="GEOTAB">Geotab</option>
          <option value="SAMSARA">Samsara</option>
        </Select>
      </InputGroup>
      <InputGroup>
        <Label htmlFor="telematicSettings.telematicApiKey">API Key</Label>
        <Input
          id="telematicSettings.telematicApiKey"
          {...formik.getFieldProps('telematicSettings.telematicApiKey')}
        />
      </InputGroup>
    </FormSection>
  );
};

export default FleetOwnerSection; 