import React from 'react';

import FormLabel from './FormLabel';

export default {
  title: 'Components/FormLabel',
  component: FormLabel,
  argTypes: {
    errorMessage: {
      control: { type: 'text' },
    },
    hint: {
      control: { type: 'text' },
    },
    requirementLabel: {
      control: { type: 'text' },
    },
  },
  args: {
    children: 'Sample Label',
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
};

const Template = ({ data, ...args }) => <FormLabel {...args} />;

export const FormLabelDefault = Template.bind({});

export const FormLabelWithHint = Template.bind({});
FormLabelWithHint.args = {
  hint: 'Example of a hint for a form label',
};

export const FormLabelWithError = Template.bind({});
FormLabelWithError.args = {
  errorMessage: 'Example of an error for a form label',
};

export const InverseFormLabel = Template.bind({});
InverseFormLabel.args = {
  inversed: true,
};

InverseFormLabel.parameters = {
  backgrounds: { default: process.env.STORYBOOK_DS === 'mgov' ? 'Mgov dark' : 'Hcgov dark' },
};
