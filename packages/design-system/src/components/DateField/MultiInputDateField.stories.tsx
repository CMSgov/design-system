import React from 'react';
import { useState } from 'react';
import MultiInputDateField from './MultiInputDateField';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MultiInputDateField> = {
  title: 'Components/MultiInputDateField',
  component: MultiInputDateField,
};
export default meta;

type Story = StoryObj<typeof MultiInputDateField>;

const ControlledTemplate: Story = {
  render: function Component(args) {
    const [dateState, setDateState] = useState({ month: '10', day: '30', year: '1980' });

    return (
      <MultiInputDateField
        {...args}
        label={
          <span>
            Controlled example using <code>dateFormatter</code>
          </span>
        }
        hint="Try to enter a date with invalid number of digits"
        monthValue={dateState.month}
        dayValue={dateState.day}
        yearValue={dateState.year}
        onChange={(e, dateObject) => setDateState(dateObject)}
      />
    );
  },
};

export const MultiInputDateFieldDefault: Story = {
  args: {
    monthDefaultValue: '10',
    dayDefaultValue: '31',
    yearDefaultValue: '1965',
  },
};

export const MultiInputDateFieldWithError: Story = {
  args: {
    errorMessage: 'Please enter a year in the past',
    monthDefaultValue: '10',
    dayDefaultValue: '31',
    yearDefaultValue: '2050',
    yearInvalid: true,
  },
};

export const ControlledMultiInputDateField: Story = {
  ...ControlledTemplate,
};

export const InvertedMultiInputDateField: Story = {
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
