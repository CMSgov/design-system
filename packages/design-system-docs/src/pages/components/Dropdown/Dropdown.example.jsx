import { Dropdown } from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const dropdownOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: '6' },
  { label: 'Option 7', value: '7' },
  { label: 'Option 8', value: '8' },
];
const dropdownOptions2 = [
  { label: '--Please select an option--', value: '' },
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: '6' },
  { label: 'Option 7', value: '7' },
  { label: 'Option 8', value: '8' },
];

ReactDOM.render(
  <div className="example--wrapper">
    <Dropdown
      options={dropdownOptions2}
      defaultValue=""
      label="Dropdown example"
      labelClassName="ds-u-margin-top--0"
      name="dropdown_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue="1"
      size="small"
      label="Small size example"
      name="small_dropdown_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue="1"
      size="medium"
      label="Medium size example"
      name="medium_dropdown_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue="1"
      errorMessage="Example error message"
      hint="Helpful hint text"
      label="Error example"
      name="error_dropdown_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue="1"
      label="Disabled example"
      disabled
      name="disabled_dropdown_field"
    />
    <Dropdown
      options={[]}
      defaultValue="1-1"
      label="Option group example"
      name="custom_dropdown_field"
    >
      <optgroup label="Option group">
        <option value="1-1">Option 1</option>
        <option value="1-2">Option 2</option>
        <option value="1-3">Option 3</option>
      </optgroup>
      <optgroup label="More option groups">
        <option value="2-1">Option 4</option>
        <option value="2-2">Option 5</option>
        <option value="2-3">Option 6</option>
      </optgroup>
    </Dropdown>
    <div className="example--wrapper example--inverse">
      <Dropdown
        labelClassName="ds-u-margin-top--0"
        options={dropdownOptions}
        defaultValue="1"
        errorMessage="Example error message"
        hint="Helpful hint text"
        label="Inverse example"
        name="inverse_dropdown_field"
        inversed
      />
    </div>
  </div>,
  document.getElementById('js-example')
);
