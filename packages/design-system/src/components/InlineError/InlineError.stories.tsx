import React from 'react';
import { InlineError } from './InlineError';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InlineError> = {
  title: 'Components/InlineError',
  component: InlineError as any,
  args: {
    children: 'Sample InlineError',
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['span'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof InlineError>;

export const Default: Story = {};
