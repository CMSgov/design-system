import React, { useState } from 'react';
import { SingleInputDateField } from '@cmsgov/design-system';

function SingleInputDateFieldExample() {
  const [dateString, updateDate] = useState('');
  return (
    <>
      <h2>SingleInputDateField Example</h2>
      <SingleInputDateField
        hint="If you were born on a leap day, entering the date will either crash our servers or open a portal to an alternate dimension."
        label="Enter your date of birth."
        name="single-input-date-field"
        fromYear={2023}
        toYear={2023}
        value={dateString}
        onChange={updateDate}
      />
    </>
  );
}

export default SingleInputDateFieldExample;
