import React, { useState } from 'react';
import { TextField, BuiltInMask } from '@design-system';
import ReactDOM from 'react-dom';

const Example = () => {
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  return (
    <>
      <TextField
        name="labelMask-date"
        label="Enter the last day of your coverage"
        hint="If you don't have it, give your best estimate. For example: 01/02/2022"
        labelMask={BuiltInMask.DATE}
        value={date}
        onChange={(event) => setDate(event.currentTarget.value)}
      />
      <TextField
        name="labelMask-custom"
        label="Enter a valid phone number"
        hint="For example: ###-###-####"
        labelMask={(rawInput) =>
          /^(\d{1,3})[-\s]?(\d{1,3})?[-\s]?(\d{1,4})?$/
            .exec(rawInput)
            .slice(1)
            .filter((s) => s)
            .join('-')
        }
        value={phone}
        onChange={(event) => setPhone(event.currentTarget.value)}
      />
    </>
  );
};

ReactDOM.render(<Example />, document.getElementById('js-example'));
