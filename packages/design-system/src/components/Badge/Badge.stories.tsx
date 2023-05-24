import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta = {
  component: Badge,
  argTypes: {
    size: {
      options: ['default', 'big'],
      control: { type: 'radio' },
    },
    variation: {
      options: ['default', 'info', 'success', 'warn', 'alert'],
      control: { type: 'radio' },
    },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;
const BadgeTemplate: Story = {
  render: ({ ...args }) => {
    return <Badge {...args}>{args.children}</Badge>;
  },
};

export const Default = {
  ...BadgeTemplate,
  args: {
    children: '6',
  },
};

export const Informational = {
  ...BadgeTemplate,
  args: {
    variation: 'info',
    children: '29',
  },
};

export const Success = {
  ...BadgeTemplate,
  args: {
    variation: 'success',
    children: 'Best value',
  },
};

export const Warning = {
  ...BadgeTemplate,
  args: {
    variation: 'warn',
    children: 'Expiring soon',
  },
};

export const Alert = {
  ...BadgeTemplate,
  args: {
    variation: 'alert',
    children: 'Out of network',
  },
};

export const Big = {
  ...BadgeTemplate,
  args: {
    size: 'big',
    children: 'Ibuprofen',
  },
};
