import React from 'react';
import UsaBanner from './UsaBanner';
import { setLanguage } from '../i18n';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UsaBanner> = {
  title: 'Components/USA Banner',
  component: UsaBanner,
};
export default meta;

type Story = StoryObj<typeof UsaBanner>;

export const EnglishBanner: Story = {};

export const SpanishBanner: Story = {
  decorators: [
    (Story) => {
      setLanguage('es');
      return <Story />;
    },
  ],
};
