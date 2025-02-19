import type { Meta, StoryObj } from '@storybook/react';
import BoxContent from './BoxContent';

const meta: Meta = {
  component: BoxContent,
  argTypes: {
    children: { control: 'text' },
    bordered: { control: 'boolean', defaultValue: true },
    heading: { control: 'text' },
    headingLevel: { control: 'text' },
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['aside'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BoxContent>;

const BoxContentTemplate: Story = {
  render: ({ ...args }) => {
    return <BoxContent {...args}>{args.children}</BoxContent>;
  },
};

export const Default = {
  ...BoxContentTemplate,
  args: {
    heading: 'The Inflation Reduction Act',
    children:
      "The Inflation Reduction Act keeps these savings and lower costs through 2025. If you qualify for savings, you'll find out the lower costs when you shop for plans.",
    bordered: true,
  },
};
