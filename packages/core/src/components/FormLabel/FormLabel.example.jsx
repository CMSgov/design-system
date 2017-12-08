import FormLabel from './FormLabel';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <FormLabel
    errorMessage="Your favorite number cannot be the same as your favorite color."
    hint="It must not be the same as your favorite number"
    fieldId="an-input-field"
  >
    Please enter your favorite color
  </FormLabel>,
  document.getElementById('js-example')
);
