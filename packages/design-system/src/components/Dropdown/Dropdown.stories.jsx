import React from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    children: { control: false },
    options: { control: false },
    requirementLabel: { control: 'text' },
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    label: { control: 'text' },
  },
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

const htmlOptGroups = (
  <>
    <optgroup label="Group A">
      <option value="a-1">Option A-1</option>
      <option value="a-2">Option A-2</option>
      <option value="a-3">Option A-3</option>
    </optgroup>
    <optgroup label="Group B">
      <option value="b-1">Option B-1</option>
      <option value="b-2">Option B-2</option>
      <option value="b-3">Option B-3</option>
    </optgroup>
  </>
);

const htmlOptions = (
  <>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
    <option value="5">Option 5</option>
    <option value="6">Option 6</option>
    <option value="7">Option 7</option>
    <option value="8">Option 8</option>
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

export const HtmlOptionGroups = Template.bind({});
HtmlOptionGroups.args = {
  options: undefined,
  label: 'Option group example',
  name: 'custom_dropdown_field',
  children: htmlOptGroups,
};

export const HtmlOptions = Template.bind({});
HtmlOptions.args = {
  options: undefined,
  label: 'Option group example',
  name: 'custom_dropdown_field',
  children: htmlOptions,
};

export const InverseOption = Template.bind({});
InverseOption.args = {
  options: dropdownOptions,
  hint: 'Helpful hint text',
  label: 'Inverse example',
  name: 'inverse_dropdown_field',
  inversed: true,
};
InverseOption.parameters = {
  baseInverse: true,
};
