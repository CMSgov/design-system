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
      defaultValue={'2'}
      hint="Example hint text"
      label="Dropdown example"
      name="dropdown_choices_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue={'2'}
      size="small"
      label="Small dropdown example"
      name="small_dropdown_choices_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue={'2'}
      size="medium"
      label="Medium dropdown example"
      name="medium_dropdown_choices_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue={'2'}
      label="Disabled example"
      disabled
      name="disabled_dropdown_choices_field"
    />
  </div>,
  document.getElementById('js-example')
);
