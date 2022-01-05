import { Dropdown } from '@cmsgov/ds-healthcare-gov';
import React from 'react';

function DropdownExample(): React.ReactElement {
  const dropdownOptions = [
    { label: '- Select an option -', value: '' },
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
    { label: 'Option 6', value: '6' },
    { label: 'Option 7', value: '7' },
    { label: 'Option 8', value: '8' },
  ];
  return (
    <div>
      <h2>Dropdown Example</h2>
      <Dropdown
        options={dropdownOptions}
        defaultValue=""
        label="Dropdown example"
        labelClassName="ds-u-margin-top--0"
        name="dropdown_field"
      />
    </div>
  );
}

export default DropdownExample;
