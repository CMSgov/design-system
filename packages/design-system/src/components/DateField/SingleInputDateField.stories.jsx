import React from 'react';
import SingleInputDateField from './SingleInputDateField';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'Components/SingleInputDateField',
  component: SingleInputDateField,
  argTypes: {
    errorMessage: {
      control: { type: 'text' },
    },
    errorPlacement: {
      control: {
        type: 'radio',
      },
      options: ['top', 'bottom'],
    },
    hint: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
    requirementLabel: {
      control: { type: 'text' },
    },
    fromDate: {
      control: { type: 'date' },
    },
    toDate: {
      control: { type: 'date' },
    },
    fromMonth: {
      control: { type: 'date' },
    },
    toMonth: {
      control: { type: 'date' },
    },
    defaultMonth: {
      control: { type: 'date' },
    },
  },
  args: {
    errorPlacement: 'top',
    hint: 'Please enter your birthday',
    label: 'Birthday',
    name: 'single-input-date-field',
  },
};

const Template = () => {
  const [{ dateString, ...args }, updateArgs] = useArgs({ dateString: '' });
  const onChange = (...params) => {
    action('onChange')(...params);
    updateArgs({ dateString: params[0] });
  };
  return <SingleInputDateField {...args} value={dateString} onChange={onChange} />;
};

export const Default = Template.bind({});

export const WithPicker = Template.bind({});
WithPicker.args = {
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
};

export const WithError = Template.bind({});
WithError.args = {
  ...WithPicker.args,
  errorMessage: 'Example error message',
};
