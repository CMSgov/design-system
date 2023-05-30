import React from 'react';
import Logo from './Logo';
import { setLanguage } from '@cmsgov/design-system';

export default {
  title: 'Healthcare/Logo',
  component: Logo,
  parameters: { theme: 'healthcare' },
};

const Template = (args) => <Logo {...args} />;

export const EnglishLogo = Template.bind({});

export const SpanishLogo = Template.bind({});
SpanishLogo.decorators = [
  (Story) => {
    setLanguage('es');
    return <Story />;
  },
];
