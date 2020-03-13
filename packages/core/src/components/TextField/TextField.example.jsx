import React from 'react';
import ReactDOM from 'react-dom';
import TextField from './TextField';

ReactDOM.render(
  <div>
    <TextField
      defaultValue="Example value"
      label="Single line"
      labelClassName="ds-u-margin-top--0"
      name="single_example"
      requirementLabel="Optional"
    />
    <TextField defaultValue="123" label="Number field" name="number_example" numeric />
    <TextField label="Small size modifier" name="small_example" size="small" />
    <TextField label="Medium size modifier" name="medium_example" size="medium" />
    <TextField
      errorMessage="Error message example"
      hint="Example of a multiline field with an error"
      label="Multiline"
      multiline
      name="multiline_example"
    />
    <TextField label="Disabled field" disabled name="disabled_example" value="Example value" />
    <TextField
      label="Password field"
      name="disabled_example"
      type="password"
      value="Example value"
    />
  </div>,
  document.getElementById('js-example')
);
