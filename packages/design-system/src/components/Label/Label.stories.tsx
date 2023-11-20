import React from 'react';
import Label from './Label';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label as any,
  argTypes: {
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    requirementLabel: { control: 'text' },
  },
  args: {
    children: 'Sample Label',
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['label', 'legend'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const LabelDefault: Story = {};

export const InverseLabel: Story = {
  args: {
    inversed: true,
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};
