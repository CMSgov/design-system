import DateField from './DateField';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <DateField
    monthDefaultValue={10}
    dayDefaultValue="31"
    yearDefaultValue="2020"
  />,
  document.getElementById('js-example')
);
