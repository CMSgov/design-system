import React, { useState } from 'react';
import SingleInputDateField from './SingleInputDateField';

export default {
  title: 'Components/SingleInputDateField',
  component: SingleInputDateField,
  argTypes: {
    errorMessage: {
      control: { type: 'text' },
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
  },
  args: {
    label: 'Birthday',
    hint: 'Please enter your birthday',
    name: 'single-input-date-field',
  },
};

const Template = ({ ...args }) => {
  const [dateString, setDateString] = useState('');
  return (
    <SingleInputDateField
      {...args}
      value={dateString}
      onChange={(event) => setDateString(event.currentTarget.value)}
    />
  );
};

export const Default = Template.bind({});

export const WithPicker = Template.bind({});
WithPicker.args = {
  fromYear: new Date().getFullYear(),
};
