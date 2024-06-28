import { Hint } from './Hint';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Hint> = {
  title: 'Components/Hint',
  component: Hint as any,
  args: {
    children:
      'If a married couple files a joint return, either spouse may be the primary taxpayer.',
  },
  argTypes: {
    requirementLabel: { control: 'text' },
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['div'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Hint>;

export const Default: Story = {};
