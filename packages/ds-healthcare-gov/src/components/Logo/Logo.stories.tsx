import React from 'react';

import Logo from './Logo';

export default {
  title: 'Healthcare/Logo',
  component: Logo,
  args: {},
  decorators: [
    (Story) => (
      <div data-theme="healthcare">
        <Story />
      </div>
    ),
  ],
};

const Template = ({ data, ...args }) => <Logo {...args} />;

export const EnglishLogo = Template.bind({});
export const SpanishLogo = Template.bind({});
SpanishLogo.args = {
  locale: 'es',
};
