import React from 'react';
import Card from './Card';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
  title: 'Medicare/Card',
  component: Card,
  args: {
    children:
      'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair...',
    className: 'ds-u-padding--2',
  },
  parameters: { theme: 'medicare' },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};
