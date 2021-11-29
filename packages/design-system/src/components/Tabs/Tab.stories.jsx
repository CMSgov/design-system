import React from 'react';
import Tab from './Tab';

export default {
  title: 'Components/Tabs',
  component: Tab,
  argTypes: {
    children: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
  },
  args: {
    children: 'tab title',
    disabled: false,
    selected: true,
  },
};

const Template = ({ data, ...args }) => <Tab {...args} />;
export const TabComponent = Template.bind({});
