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
  { label: 'Confederated Tribes and Bands of the Yakama Nation', value: '1' },
  { label: 'Confederated Tribes of the Chehalis Reservation', value: '2' },
  { label: 'Confederated Tribes of the Colville Reservation', value: '3' },
  { label: 'Cowlitz Indian Tribe', value: '4' },
  {
    label: 'Hoh Indian Tribe (formerly the Hoh Indian Tribe of the Hoh Indian Reservation)',
    value: '5',
  },
  {
    label:
      'Nisqually Indian Tribe (formerly the Nisqually Indian Tribe of the Nisqually Reservation)',
    value: '6',
  },
  { label: 'Lummi Tribe of the Lummi Reservation', value: '7' },
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

export const Default = Template.bind({});
Default.args = {
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

export const OptionGroups = Template.bind({});
OptionGroups.args = {
  options: [
    {
      label: 'Group A',
      options: [
        { value: 'a-1', label: 'Option A-1' },
        { value: 'a-2', label: 'Option A-2' },
        { value: 'a-3', label: 'Option A-3' },
      ],
    },
    {
      label: 'Group B',
      options: [
        { value: 'b-1', label: 'Option B-1' },
        { value: 'b-2', label: 'Option B-2' },
        { value: 'b-3', label: 'Option B-3' },
      ],
    },
  ],
  label: 'Option groups example',
  name: 'optgroups_dropdown_field',
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
  errorMessage: 'Example error message',
  hint: 'Helpful hint text',
  label: 'Inverse example',
  name: 'inverse_dropdown_field',
  inversed: true,
};
InverseOption.parameters = {
  // Must supply `layout: 'fullscreen'` when we use `onDark: true`
  onDark: true,
  layout: 'fullscreen',
};
