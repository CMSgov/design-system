import Label from './Label';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label as any,
  argTypes: {
    children: {
      control: 'text',
      type: {
        name: 'ReactNode' as 'string',
        required: true,
      },
    },
    ref: { table: { disable: true } },
  },
  args: {
    children: 'Enter your date of birth.',
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['label', 'legend'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Inverse: Story = {
  args: {
    inversed: true,
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};
