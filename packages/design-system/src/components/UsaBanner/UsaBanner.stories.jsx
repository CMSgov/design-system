import React from 'react';
import UsaBanner from './UsaBanner';

export default {
  title: 'Components/USA Banner',
  component: UsaBanner,
};

const Template = ({ data, ...args }) => <UsaBanner {...args} />;

export const Default = Template.bind({});
