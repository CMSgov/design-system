import React from 'react';

import DateField from './DateField';

export default {
  title: 'Components/DateField',
  component: DateField,
  argTypes: {},
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

const Template = ({ data, ...args }) => <DateField {...args} />;

export const DateFieldDefault = Template.bind({});
DateFieldDefault.args = {};

export const InverseDateField = Template({});
InverseDateField.args = {
  inversed: true,
};
InverseDateField.parameters = {
  backgrounds: { default: process.env.STORYBOOK_DS === 'mgov' ? 'Mgov dark' : 'Hcgov dark' },
};
