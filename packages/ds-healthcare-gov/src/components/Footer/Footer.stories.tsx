import React from 'react';
import Footer from './Footer';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Footer> = {
  title: 'Healthcare/Footer',
  component: Footer,
  args: {
    className: '',
  },
  parameters: { theme: 'healthcare' },
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const BasicFooter: Story = {};
