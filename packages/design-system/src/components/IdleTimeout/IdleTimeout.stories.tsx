import React from 'react';
import IdleTimeout from './IdleTimeout';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'Components/Idle Timeout',
  component: IdleTimeout,
  argTypes: {},
  args: {
    timeToTimeout: 3,
    timeToWarning: 2,
    onTimeout: () => {
      console.log('onTimeout');
    },
  },
};

const Template = ({ ...args }) => (
  <IdleTimeout
    timeToTimeout={3}
    onTimeout={() => {
      console.log('onTimeout');
    }}
    {...args}
    timeToWarning={2}
  />
);

export const Default = Template.bind({});
