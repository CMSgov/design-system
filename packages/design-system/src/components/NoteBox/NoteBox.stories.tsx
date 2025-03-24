import type { Meta, StoryObj } from '@storybook/react';
import NoteBox from './NoteBox';

const meta: Meta = {
  component: NoteBox,
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
type Story = StoryObj<typeof NoteBox>;

const NoteBoxTemplate: Story = {
  render: ({ ...args }) => {
    return <NoteBox {...args}>{args.children}</NoteBox>;
  },
};

export const Default = {
  ...NoteBoxTemplate,
  args: {
    heading: 'The Inflation Reduction Act',
    children:
      "The Inflation Reduction Act keeps these savings and lower costs through 2025. If you qualify for savings, you'll find out the lower costs when you shop for plans.",
    bordered: true,
  },
};
