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
  decorators: [
    (Story) => (
      <div data-theme="medicare">
        <Story />
      </div>
    ),
  ],
};

const Template = ({ data, ...args }) => <Stars {...args} />;

export const Default = Template.bind({});
