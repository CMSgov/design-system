import DateField from './DateField';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.Fragment>
    <DateField
      monthDefaultValue={10}
      dayDefaultValue="31"
      yearDefaultValue="2020"
      onComponentBlur={() => console.log('[DateField]: Component lost focus')}
    />

    <DateField
      errorMessage="Please enter a year in the past"
      monthDefaultValue={10}
      dayDefaultValue="31"
      yearDefaultValue="2020"
      yearInvalid
    />
  </React.Fragment>,
  document.getElementById('js-example')
);
