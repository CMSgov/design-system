import { TextField } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const Example = () => {
  return (
    <div>
      <TextField
        label="Phone number"
        labelMask="phone"
        inputMode="tel"
        name="phone_example"
        type="tel"
        helpText="(123) 456-7890"
      />
      <TextField
        label="Social security number (SSN)"
        labelMask="ssn"
        inputMode="numeric"
        type="text"
        name="ssn_example"
        helpText="123-45-6789"
      />
      <TextField
        label="Date"
        labelMask="date"
        inputMode="numeric"
        type="numeric"
        name="date_example"
        helpText="MM/DD/YYYY"
      />
      <TextField
        label="Day/Month"
        labelMask="day_month"
        inputMode="numeric"
        type="text"
        name="dayMonth_example"
        helpText="MM/DD"
      />
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById('js-example'));
