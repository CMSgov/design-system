import React from 'react';
import DateField from './DateField';

export default {
  title: 'Components/DateField',
  component: DateField,
  args: {},
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

const Template = ({ ...args }) => <DateField {...args} />;

export const DateFieldDefault = Template.bind({});
