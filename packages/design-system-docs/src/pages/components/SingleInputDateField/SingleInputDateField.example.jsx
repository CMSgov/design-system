import { SingleInputDateField } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

function DateField() {
  const [date, setDate] = React.useState('');
  return (
    <SingleInputDateField
      label="Birthday"
      hint="Please enter your birthday"
      name="single-input-date-field"
      onChange={setDate}
      value={date}
    />
  );
}

ReactDOM.render(<DateField />, document.getElementById('js-example'));
