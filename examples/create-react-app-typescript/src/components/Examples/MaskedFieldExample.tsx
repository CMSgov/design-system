import React from 'react';
import { TextField } from '@cmsgov/design-system';

function MaskedFieldExample(): React.ReactElement {
  return (
    <div>
      <h2>Masked Field Example</h2>
      <TextField
        ariaLabel="Enter monthly income amount in dollars."
        labelClassName="ds-u-margin-top--0"
        label="Currency"
        mask="currency"
        inputMode="numeric"
        type="text"
        name="currency_example"
        defaultValue="2,500"
      />
    </div>
  );
}

export default MaskedFieldExample;
