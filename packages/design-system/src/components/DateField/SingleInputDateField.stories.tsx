import React, { useState } from 'react';
import SingleInputDateField from './SingleInputDateField';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SingleInputDateField> = {
  title: 'Components/SingleInputDateField',
  component: SingleInputDateField,
  args: {
    hint: 'Please enter your birthday',
    label: 'Birthday',
    name: 'single-input-date-field',
  },
};
export default meta;

type Story = StoryObj<typeof SingleInputDateField>;

export const Default: Story = {
  render: function Component(args) {
    const [dateString, updateDate] = useState();
    const onChange = (...params) => {
      action('onChange')(...params);
      updateDate(params[0]);
    };
    return (
      <SingleInputDateField
        {...args}
        name="single-input-date-field"
        value={dateString ?? ''}
        onChange={onChange}
      />
    );
  },
};

export const WithPicker: Story = {
  ...Default,
  args: {
    label: 'What day did you move?',
    hint: 'This date should be within the past 60 days in order to qualify',
    fromYear: new Date().getFullYear(),
    // TODO: Due to some unknown issue with this story that causes us to lose args
    // defined with query parameters, we can't supply a specific date in the
    // browser interaction tests in order to get consistent screenshots. We want
    // to set this to an arbitrary date in the past so it always takes a screenshot
    // of the same calendar view every time. If we can solve the root problem, we
    // can move this setting of the toDate to the `.test.interaction.ts` file.
    toDate: new Date(1676498194272),
  },
};

export const WithError = {
  ...Default,
  args: {
    errorMessage: 'Example error message',
    ...WithPicker.args,
  },
};
