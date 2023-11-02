import { DateField } from '@cmsgov/design-system';
import React from 'react';

function DateFieldExample() {
  return (
    <div>
      <h2>DateField Example</h2>
      <DateField
        label="Date of birth"
        errorMessage="Please enter a year in the past"
        monthDefaultValue="10"
        dayDefaultValue="31"
        yearDefaultValue="2050"
        yearInvalid
      />
    </div>
  );
}

export default DateFieldExample;
