import React from 'react';
import { Hint } from './Hint';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Hint> = {
  title: 'Components/Hint',
  component: Hint as any,
  args: {
    children: 'Sample Hint',
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
