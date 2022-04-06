import React from 'react';

import SimpleFooter from './SimpleFooter';

export default {
  title: 'Components/SimpleFooter',
  component: SimpleFooter,
  argTypes: {
    language: {
      control: 'radio',
      options: ['en', 'es'],
    },
  },
};

const Template = ({ data, ...args }) => <SimpleFooter {...args} />;

export const Default = Template.bind({});
