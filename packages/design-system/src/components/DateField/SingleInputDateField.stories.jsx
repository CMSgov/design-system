import { useState } from 'react';
import SingleInputDateField from './SingleInputDateField';

export default {
  title: 'Components/SingleInputDateField',
  component: SingleInputDateField,
  argTypes: {
    errorMessage: {
      control: { type: 'text' },
    },
    errorPlacement: {
      defaultValue: 'top',
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
  },
  args: {
    label: 'Birthday',
    hint: 'Please enter your birthday',
    name: 'single-input-date-field',
  },
};

const Template = ({ ...args }) => {
  const [dateString, setDateString] = useState('');
  return <SingleInputDateField {...args} value={dateString} onChange={setDateString} />;
};

export const Default = Template.bind({});

export const WithPicker = Template.bind({});
WithPicker.args = {
  label: 'What day did you move?',
  hint: 'This date should be within the past 60 days in order to qualify',
  fromYear: new Date().getFullYear(),
  toDate: new Date(),
};

export const WithError = Template.bind({});
WithError.args = {
  ...WithPicker.args,
  errorMessage: 'Example error message',
};
