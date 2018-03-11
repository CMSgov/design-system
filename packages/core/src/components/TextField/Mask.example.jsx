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
        label="Currency mask"
        mask="currency"
        name="currency_example"
        onBlur={evt => handleBlur(evt, 'currency')}
        value="2500"
      />

      <TextField
        label="Zip code"
        mask="zip"
        name="zip_example"
        onBlur={evt => handleBlur(evt, 'zip')}
        value="123456789"
      />
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById('js-example'));
