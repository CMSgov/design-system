import React from 'react';

import Logo from './Logo';

export default {
  title: 'Healthcare/Logo',
  component: Logo,
  args: {},
};

const Template = ({ data, ...args }) => <Logo {...args} />;

export const EnglishLogo = Template.bind({});
export const SpanishLogo = Template.bind({});
SpanishLogo.args = {
  locale: 'es',
};
