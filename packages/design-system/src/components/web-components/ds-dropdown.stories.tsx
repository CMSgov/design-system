import React from 'react';
import './ds-dropdown';

export default {
  title: 'Web Components/Dropdown',
  argTypes: {
    children: { control: false },
    options: { control: false },
    requirementLabel: { control: 'text' },
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    label: 'Dropdown example',
    name: 'dropdown_field',
  }
};

const Template = (args) => (
  <ds-dropdown key={JSON.stringify(args)}>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
    <option value="5">Option 5</option>
    <option value="6">Option 6</option>
    <option value="7">Option 7</option>
    <option value="8">Option 8</option>
  </ds-dropdown>
);

export const Default = Template.bind({});
