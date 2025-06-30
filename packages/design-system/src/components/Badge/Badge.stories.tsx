import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const badgeOptions = ['', 'info', 'success', 'warn', 'alert'];

const meta: Meta = {
  component: Badge,
  argTypes: {
    ref: { table: { disable: true } },
    size: {
      options: ['default', 'big'],
      control: { type: 'radio' },
    },
    variation: {
      options: badgeOptions,
      mapping: badgeOptions,
      control: {
        type: 'radio',
        labels: {
          '': 'default',
          info: 'info',
          success: 'success',
          warn: 'warn',
          alert: 'alert',
        },
      },
    },
    children: {
      control: 'text',
      description: 'Label text or HTML.',
      type: { name: 'string', required: true },
    },
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['span'],
    },
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
