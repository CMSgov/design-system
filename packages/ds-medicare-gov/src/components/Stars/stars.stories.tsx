import React from 'react';
import Stars, { StarsProps } from './Stars';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Stars> = {
  title: 'Medicare/Stars',
  component: Stars,
  args: {
    number: 2.5,
  },
  parameters: { theme: 'medicare' },
};
export default meta;

type Story = StoryObj<typeof Stars>;

export const Default: Story = {
  render: ({ ...args }) => <Stars {...(args as StarsProps)} />,
};
