/* eslint-disable react/display-name */
import React from 'react';
import TextField from './TextField';

export default function() {
  return (
    <div>
      <TextField
        defaultValue='Example value'
        label='Single line'
        labelClassName='ds-u-margin-top--0'
        name='single_example'
      />
      <TextField
        errorMessage='Error message example'
        hint='Example of a multiline field with an error'
        label='Multiline'
        multiline
        name='multiline_example'
      />
      <TextField
        label='Disabled field'
        disabled
        name='disabled_example'
        value='Example value'
      />
      <TextField
        label='Password field'
        name='disabled_example'
        type='password'
      />
    </div>
  );
}
