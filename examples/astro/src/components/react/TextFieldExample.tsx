import React from 'react';
import { TextField } from '@cmsgov/design-system';

function TextFieldExample() {
  return (
    <>
      <h2>TextField Example</h2>
      <TextField
        defaultValue="Example value"
        label="Single line field"
        labelClassName="ds-u-margin-top--0"
        name="single_example"
      />
    </>
  );
}

export default TextFieldExample;
