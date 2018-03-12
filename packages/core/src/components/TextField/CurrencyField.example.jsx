import TextField, { unmaskValue } from './TextField';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <TextField
    ariaLabel="Enter monthly income amount in dollars."
    label="Monthly income"
    mask="currency"
    name="currency_example"
    onBlur={e => {
      // import { unmaskValue } from '@cmsgov/design-system-core';
      console.log('Unmasked value:', unmaskValue(e.target.value, 'currency'));
    }}
    value="2500"
  />,
  document.getElementById('js-example')
);
