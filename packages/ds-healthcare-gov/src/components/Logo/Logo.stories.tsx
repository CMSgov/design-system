import React from 'react';
import Logo from './Logo';
import { setLanguage } from '@cmsgov/design-system';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Logo> = {
  title: 'Healthcare/Logo',
  component: Logo,
  parameters: { theme: 'healthcare' },
};
export default meta;

type Story = StoryObj<typeof Logo>;

export const EnglishLogo: Story = {};

export const SpanishLogo: Story = {
  decorators: [
    (Story) => {
      setLanguage('es');
      return <Story />;
    },
  ],
};
