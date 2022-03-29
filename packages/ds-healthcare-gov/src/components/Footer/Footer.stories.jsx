import React from 'react';

import Footer from './Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {
    className: {
      control: { type: 'text' },
      type: { name: 'string', required: false },
    },
  },
  args: {
    className: '',
  },
};

const Template = ({ data, ...args }) => <Footer {...args} />;

export const BasicFooter = Template.bind({});
