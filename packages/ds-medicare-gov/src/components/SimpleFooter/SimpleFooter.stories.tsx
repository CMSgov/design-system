import React from 'react';
import SimpleFooter from './SimpleFooter';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SimpleFooter> = {
  title: 'Medicare/SimpleFooter',
  component: SimpleFooter,
  parameters: { theme: 'medicare' },
};
export default meta;

type Story = StoryObj<typeof SimpleFooter>;

export const Default: Story = {};
