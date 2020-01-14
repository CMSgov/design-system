import Dropdown from './Dropdown';
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
  { label: 'Option 8', value: '8' }
];

ReactDOM.render(
  <div>
    <Dropdown
      options={dropdownOptions}
      defaultValue={'1'}
      hint="Example hint text"
      label="Dropdown example"
      name="dropdown_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue={'1'}
      size="small"
      label="Small dropdown example"
      name="small_dropdown_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue={'1'}
      size="medium"
      label="Medium dropdown example"
      name="medium_dropdown_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue={'1'}
      label="Disabled dropdown example"
      disabled
      name="disabled_dropdown_field"
    />
    <Dropdown
      options={[]}
      defaultValue={'1-1'}
      label="Option group dropdown example"
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
  </div>,
  document.getElementById('js-example')
);
