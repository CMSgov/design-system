import FormLabel from './FormLabel';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <FormLabel
    errorMessage="Please enter a valid phone number."
    hint="We'll use this number as a backup if we need to contact you about your application."
    fieldId="number-field-id"
    requirementLabel="Optional"
  >
    Phone number
  </FormLabel>,
  document.getElementById('js-example')
);
