import { MultiInputDateField } from '@cmsgov/design-system';
import React from 'react';

function MultiInputDateFieldExample() {
  return (
    <div>
      <h2>MultiInputDateField Example</h2>
      <MultiInputDateField
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

export default MultiInputDateFieldExample;
