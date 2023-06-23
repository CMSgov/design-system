import React from 'react';
import MonthPicker from './MonthPicker';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MonthPicker> = {
  title: 'Components/Month Picker',
  component: MonthPicker,
  args: {
    hint: "Month Picker can receive optional help text, giving the user additional information of what's required.",
    inversed: false,
  },
};
export default meta;

type Story = StoryObj<typeof MonthPicker>;

export const Default: Story = {
  args: {
    name: 'DefaultMonthPicker',
    label: 'Select a month from Default Month Picker',
  },
};

export const Selected: Story = {
  args: {
    name: 'SelectedMonthPicker',
    label: 'Select additional months from Selected Month Picker',
    hint: 'Preselected values are `readonly` when `selectedMonths` property is used. For mutable values, use the `defaultSelectedMonths` property.',
    selectedMonths: [1, 2, 3, 4, 5, 6],
  },
};

export const Disabled: Story = {
  args: {
    name: 'DisabledMonthPicker',
    label: 'Select available months from Disabled Month Picker',
    disabledMonths: [7, 8, 9, 10, 11, 12],
  },
};

export const WithError: Story = {
  args: {
    errorMessage: 'There was a problem with your selection.',
    name: 'WithErrorMonthPicker',
    label: 'Select available months.',
    selectedMonths: [2],
  },
};

export const Inverse: Story = {
  args: {
    name: 'InverseMonthPicker',
    label: 'Select a month from Inverse Month Picker',
    inversed: true,
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};

export const InverseSelected: Story = {
  args: {
    name: 'InverseSelectedMonthPicker',
    label: 'Select additional months from Inverse Selected Month Picker',
    hint: 'Preselected values are `readonly` when `selectedMonths` property is used. For mutable values, use the `defaultSelectedMonths` property.',
    inversed: true,
    selectedMonths: [1, 2, 3, 4, 5, 6],
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};

export const InverseDisabled: Story = {
  args: {
    name: 'InverseDisabledMonthPicker',
    label: 'Select available months from Inverse Disabled Month Picker',
    inversed: true,
    disabledMonths: [7, 8, 9, 10, 11, 12],
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};
