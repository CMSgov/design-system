import React, { useState } from 'react';
import { TextField, BuiltInMask } from '@design-system';
import ReactDOM from 'react-dom';

const Example = () => {
  const [date, setDate] = useState('');
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
    </>
  );
};

ReactDOM.render(<Example />, document.getElementById('js-example'));
