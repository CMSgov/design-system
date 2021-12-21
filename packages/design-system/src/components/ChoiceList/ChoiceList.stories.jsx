import React from 'react';

import ChoiceList from './ChoiceList';
import Choice from './Choice';

export default {
  title: 'Components/ChoiceList',
  component: ChoiceList,
  argTypes: {
    choices: { control: false },
  },
  args: {
    choices: [
      { label: 'Choice 1', value: 'A', defaultChecked: true },
      { label: 'Choice 2', requirementLabel: 'Choice hint text', value: 'B' },
      { label: 'Disabled choice 3', value: 'C', disabled: true },
    ],
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#fff',
        },
        {
          name: 'Hcgov dark',
          value: '#112e51',
        },
        {
          name: 'Mgov dark',
          value: '#146a5d',
        },
      ],
    },
  },
  subcomponents: { Choice },
};

const Template = (args) => <ChoiceList {...args} />;

export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args = {
  label: 'Checkbox example',
  hint: 'Helpful hint text',
  name: 'checkbox_choices',
  type: 'checkbox',
};

export const DefaultRadio = Template.bind({});
DefaultRadio.args = {
  errorMessage: 'Example error message',
  label: 'Radio example',
  name: 'radio_choices',
  type: 'radio',
};

export const SmallOption = Template.bind({});
SmallOption.args = {
  label: 'Small size example',
  name: 'size-variants',
  type: 'radio',
  size: 'small',
};

export const InverseOption = Template.bind({});
InverseOption.args = {
  label: 'Inverse example',
  errorMessage: 'Example error message',
  hint: 'Helpful hint text',
  name: 'inverse_choices_field',
  type: 'checkbox',
  inversed: true,
};
InverseOption.parameters = {
  backgrounds: { default: process.env.STORYBOOK_DS === 'mgov' ? 'Mgov dark' : 'Hcgov dark' },
};
