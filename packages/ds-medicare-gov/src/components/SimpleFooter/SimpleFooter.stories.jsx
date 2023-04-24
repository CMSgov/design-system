import React from 'react';
import SimpleFooter from './SimpleFooter';

export default {
  title: 'Medicare/SimpleFooter',
  component: SimpleFooter,
  argTypes: {
    language: {
      control: 'radio',
      options: ['en', 'es'],
    },
  },
  parameters: { theme: 'medicare' },
};

const Template = ({ data, ...args }) => <SimpleFooter {...args} />;

export const Default = Template.bind({});
