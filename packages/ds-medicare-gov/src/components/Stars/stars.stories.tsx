import React from 'react';

import Stars from './Stars';

export default {
  title: 'Medicare/Stars',
  component: Stars,
  argTypes: {
    number: {
      control: { type: 'number', step: 0.5 },
    },
  },
  args: {
    number: 2.5,
  },
};

const Template = ({ data, ...args }) => <Stars {...args} />;

export const Default = Template.bind({});
