import { SingleInputDateField } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

function DateField() {
  const [date, setDate] = React.useState('');
  return (
    <div id="App" style={{ minHeight: 450 }}>
      <SingleInputDateField
        label="Employment start date"
        hint="Please enter your employment start date"
        name="calendar-date-field"
        onChange={setDate}
        value={date}
        fromYear={new Date().getFullYear()}
      />
    </div>
  );
}

ReactDOM.render(<DateField />, document.getElementById('js-example'));
