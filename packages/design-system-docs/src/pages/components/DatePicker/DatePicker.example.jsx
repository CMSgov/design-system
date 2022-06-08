import { SingleInputDateField } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

function DateField() {
  const [date, setDate] = React.useState('');
  return (
    <SingleInputDateField
      label="Employment start date"
      hint="Please enter your employment start date"
      name="calendar-date-field"
      onChange={setDate}
      value={date}
      fromYear={new Date().getFullYear()}
    />
  );
}

ReactDOM.render(<DateField />, document.getElementById('js-example'));
