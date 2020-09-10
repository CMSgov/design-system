import { FormLabel } from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <FormLabel
      errorMessage="Please enter a valid phone number."
      hint="We'll use this number as a backup if we need to contact you about your application."
      fieldId="number-field-id"
      requirementLabel="Optional"
    >
      Phone number
    </FormLabel>
    <div className="example--wrapper example--inverse">
      <FormLabel
        errorMessage="Example error message"
        hint="Helpful hint text"
        fieldId="inverse-field-id"
        inversed
      >
        Inverse example
      </FormLabel>
    </div>
  </>,
  document.getElementById('js-example')
);
