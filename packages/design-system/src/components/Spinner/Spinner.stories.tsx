import React from 'react';
import Spinner from './Spinner';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  args: {
    inversed: false,
    filled: false,
  },
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const SmallSpinner: Story = {
  args: {
    size: 'small',
  },
};

export const BigSpinner: Story = {
  args: {
    size: 'big',
  },
};

export const FilledSpinner: Story = {
  args: {
    filled: true,
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};

export const InverseFilledSpinner: Story = {
  args: {
    inversed: true,
    filled: true,
  },
};
