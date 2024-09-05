import { useState } from 'react';
import MultiInputDateField from './MultiInputDateField';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MultiInputDateField> = {
  title: 'Components/MultiInputDateField',
  component: MultiInputDateField,
  argTypes: {
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    requirementLabel: { control: 'text' },
    dayLabel: {
      table: {
        defaultValue: { summary: 'Day' },
      },
    },
    monthLabel: {
      table: {
        defaultValue: { summary: 'Month' },
      },
    },
    yearLabel: {
      table: {
        defaultValue: { summary: 'Year' },
      },
    },
  },
  args: {
    label: 'Enter your date of birth.',
  },
};
export default meta;

type Story = StoryObj<typeof MultiInputDateField>;

export const Default: Story = {
  args: {
    monthDefaultValue: '10',
    dayDefaultValue: '31',
    yearDefaultValue: '1965',
  },
};

export const WithError: Story = {
  args: {
    errorMessage: 'Please enter a year in the past',
    monthDefaultValue: '10',
    dayDefaultValue: '31',
    yearDefaultValue: '2050',
    yearInvalid: true,
  },
};

export const Controlled: Story = {
  args: {
    hint: 'In this example, the month, day, and year values are controlled by the parent component.',
  },
  render: function Component(args) {
    const [dateState, setDateState] = useState({ month: '10', day: '30', year: '1980' });

    return (
      <MultiInputDateField
        {...args}
        monthValue={dateState.month}
        dayValue={dateState.day}
        yearValue={dateState.year}
        onChange={(e, dateObject) => setDateState(dateObject)}
      />
    );
  },
};

export const Inverted: Story = {
  args: {
    errorMessage: 'Please enter a year in the past',
    monthDefaultValue: '10',
    dayDefaultValue: '31',
    yearDefaultValue: '2050',
    yearInvalid: true,
    inversed: true,
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};
