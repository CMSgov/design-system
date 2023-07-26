import React from 'react';
import FormLabel from './FormLabel';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FormLabel> = {
  title: 'Components/FormLabel',
  component: FormLabel as any,
  args: {
    children: 'Sample Label',
  },
};
export default meta;

type Story = StoryObj<typeof FormLabel>;

export const FormLabelDefault: Story = {};

export const InverseFormLabel: Story = {
  args: {
    inversed: true,
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};
