import React from 'react';

import Stars, { StarsProps } from './Stars';

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

const Template = ({ data, ...args }) => <Stars {...(args as StarsProps)} />;

export const Default = Template.bind({});
