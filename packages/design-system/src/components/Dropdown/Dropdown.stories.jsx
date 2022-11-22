import React from 'react';
import Dropdown from './Dropdown';
import Select from './Select';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    children: { control: false },
    options: { control: false },
  },
  subcomponents: { Select },
};

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

const optGroupData = (
  <>
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
  </>
);

const Template = (args) => <Dropdown {...args} />;

export const DefaultDropdown = Template.bind({});
DefaultDropdown.args = {
  options: dropdownOptions,
  label: 'Dropdown example',
  name: 'dropdown_field',
};

export const WithError = Template.bind({});
WithError.args = {
  options: dropdownOptions,
  errorMessage: 'Example error message',
  hint: 'Helpful hint text',
  label: 'Error example',
  name: 'error_dropdown_field',
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: dropdownOptions,
  label: 'Disabled example',
  disabled: true,
  name: 'disabled_dropdown_field',
};

export const OptionGroup = Template.bind({});
OptionGroup.args = {
  options: [],
  defaultValue: '1-1',
  label: 'Option group example',
  name: 'custom_dropdown_field',
  children: optGroupData,
};

export const InverseOption = Template.bind({});
InverseOption.args = {
  options: dropdownOptions,
  errorMessage: 'Example error message',
  hint: 'Helpful hint text',
  label: 'Inverse example',
  name: 'inverse_dropdown_field',
  inversed: true,
};
InverseOption.parameters = {
  baseInverse: true,
};
