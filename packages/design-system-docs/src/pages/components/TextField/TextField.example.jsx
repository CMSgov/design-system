import React from 'react';
import ReactDOM from 'react-dom';
import { TextField } from '@cmsgov/design-system';

ReactDOM.render(
  <div>
    <TextField
      defaultValue="Example value"
      label="Single line field"
      labelClassName="ds-u-margin-top--0"
      name="single_example"
    />
    <TextField defaultValue="123" label="Number field" name="number_example" numeric />
    <TextField
      label="Password field"
      name="password_example"
      type="password"
      value="Example value"
    />
    <TextField label="Small size field" name="small_example" size="small" />
    <TextField label="Medium size field" name="medium_example" size="medium" />
    <TextField label="Multiline field" multiline name="multiline_example" />
    <TextField
      errorMessage="Example error message"
      hint="Helpful hint text"
      label="Error field"
      name="error_example"
    />
    <TextField label="Success field" fieldClassName="ds-c-field--success" name="success_example" />
    <TextField label="Disabled field" disabled name="disabled_example" />
    <div className="example--wrapper example--inverse">
      <TextField
        labelClassName="ds-u-margin-top--0"
        errorMessage="Example error message"
        hint="Helpful hint text"
        label="Inverse example"
        name="inverse_example"
        inversed
      />
    </div>
  </div>,
  document.getElementById('js-example')
);
