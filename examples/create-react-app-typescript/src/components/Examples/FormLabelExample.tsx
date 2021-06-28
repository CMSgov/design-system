import { FormLabel } from '@cmsgov/design-system';
import React from 'react';

function FormLabelExample(): React.ReactElement {
  return (
    <div>
      <h2>FormLabel Example</h2>
      <FormLabel
        errorMessage="Please enter a valid phone number."
        hint="We'll use this number as a backup if we need to contact you about your application."
        fieldId="number-field-id"
        requirementLabel="Optional"
      >
        Phone number
      </FormLabel>
    </div>
  );
}

export default FormLabelExample;
