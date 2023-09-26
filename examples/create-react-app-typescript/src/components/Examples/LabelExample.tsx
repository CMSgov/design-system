import { Label } from '@cmsgov/design-system';
import React from 'react';

function LabelExample(): React.ReactElement {
  return (
    <div>
      <h2>Label Example</h2>
      <Label
        errorMessage="Please enter a valid phone number."
        hint="We'll use this number as a backup if we need to contact you about your application."
        fieldId="number-field-id"
        requirementLabel="Optional"
      >
        Phone number
      </Label>
    </div>
  );
}

export default LabelExample;
