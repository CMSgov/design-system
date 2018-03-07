import React from 'react';
import ReactDOM from 'react-dom';
import TextField from './TextField';

ReactDOM.render(
  <TextField
    ariaLabel="Enter monthly income amount in dollars."
    label="Monthly income"
    mask="currency"
    name="currency_example"
    value="2500"
  />,
  document.getElementById('js-example')
);
