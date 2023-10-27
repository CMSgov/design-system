import React from 'react';
import './ds-dropdown';

// 'auto-focus',
// 'class-name',
// 'disabled',
// 'error-message',
// 'error-placement',
// 'field-class-name',
// 'options',
// 'label',
// 'label-class-name',
// 'label-id',
// 'name',
// 'requirements-label',
// 'role',
// 'root-id',
// 'size',
// 'value',
// 'default-value',

export default {
  title: 'Web Components/Dropdown',
  argTypes: {
    autofocus: { control: 'boolean' },
    children: { control: false },
    options: { control: false },
    'requirement-label': { control: 'text' },
    'error-message': { control: 'text' },
    hint: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    label: 'Dropdown example',
    name: 'dropdown_field',
  },
};

/*

<ds-dropdown {...args} key={JSON.stringify(args)}>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
    <option value="5">Option 5</option>
    <option value="6">Option 6</option>
    <option value="7">Option 7</option>
    <option value="8">Option 8</option>
  </ds-dropdown>

*/

const options = [
  { label: 'Confederated Tribes and Bands of the Yakama Nation', value: '1' },
  { label: 'Confederated Tribes of the Chehalis Reservation', value: '2' },
  { label: 'Confederated Tribes of the Colville Reservation', value: '3' },
];

const Template = (args) => (
  <ds-dropdown {...args} key={JSON.stringify(args)} options={JSON.stringify(options)} autofocus />
);

export const Default = Template.bind({});
