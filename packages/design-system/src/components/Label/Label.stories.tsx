import Label from './Label';
import type { Meta, StoryObj } from '@storybook/react';

const disabledArg = {
  table: {
    disable: true,
  },
};

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label as any,
  argTypes: {
    errorId: disabledArg,
    errorMessage: disabledArg,
    hint: disabledArg,
    hintId: disabledArg,
    requirementLabel: disabledArg,
    ref: disabledArg,
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
