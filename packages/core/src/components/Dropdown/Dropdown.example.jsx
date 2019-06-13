import Dropdown from './Dropdown';
import React from 'react';
import ReactDOM from 'react-dom';

const dropdownOptions = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'G', value: 'G' },
  { label: 'H', value: 'H' }
];

ReactDOM.render(
  <div>
    <Dropdown
      options={dropdownOptions}
      defaultValue={'B'}
      hint="Example hint text"
      label="Dropdown example"
      name="dropdown_choices_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue={'B'}
      size="small"
      label="Small dropdown example"
      name="small_dropdown_choices_field"
    />
    <Dropdown
      options={dropdownOptions}
      defaultValue={'B'}
      size="medium"
      label="Medium dropdown example"
      name="medium_dropdown_choices_field"
    />
  </div>,
  document.getElementById('js-example')
);
