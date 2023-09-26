import React from 'react';
import Label from './Label';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label as any,
  args: {
    children: 'Sample Label',
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
