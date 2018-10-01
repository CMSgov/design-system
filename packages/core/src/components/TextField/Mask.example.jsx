import TextField, { unmaskValue } from './TextField';
import React from 'react';
import ReactDOM from 'react-dom';
// import { unmaskValue } from '@cmsgov/design-system-core';

function handleBlur(evt, mask) {
  console.log('Unmasked value:', unmaskValue(evt.target.value, mask));
}

const Example = () => {
  return (
    <div>
      <TextField
        ariaLabel="Enter monthly income amount in dollars."
        label="Currency"
        mask="currency"
        name="currency_example"
        onBlur={evt => handleBlur(evt, 'currency')}
        defaultValue="2500"
      />

      <TextField
        label="Phone number"
        mask="phone"
        name="phone_example"
        onBlur={evt => handleBlur(evt, 'phone')}
        type="tel"
        defaultValue="1234567890"
      />

      <TextField
        label="Social security number (SSN)"
        mask="ssn"
        name="ssn_example"
        onBlur={evt => handleBlur(evt, 'ssn')}
        defaultValue="123456789"
      />

      <TextField
        label="Zip code"
        mask="zip"
        name="zip_example"
        onBlur={evt => handleBlur(evt, 'zip')}
        defaultValue="123456789"
      />
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById('js-example'));
