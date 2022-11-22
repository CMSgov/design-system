import React from 'react';
import { useState } from 'react';
import MultiInputDateField from './MultiInputDateField';
import DateInput from './DateInput';

export default {
  title: 'Components/MultiInputDateField',
  component: MultiInputDateField,
  argTypes: {
    label: { control: false },
    errorMessage: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
  },
  subcomponents: { DateInput },
};

const Template = ({ ...args }) => <MultiInputDateField {...args} />;
const ControlledTemplate = ({ ...args }) => {
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
};

export const MultiInputDateFieldDefault = Template.bind({});
MultiInputDateFieldDefault.args = {
  errorMessage: 'Please enter a year in the past',
  monthDefaultValue: '10',
  dayDefaultValue: '31',
  yearDefaultValue: '2050',
  yearInvalid: true,
};

export const ControlledMultiInputDateField = ControlledTemplate.bind({});

export const InvertedMultiInputDateField = Template.bind({});
InvertedMultiInputDateField.args = {
  errorMessage: 'Please enter a year in the past',
  monthDefaultValue: '10',
  dayDefaultValue: '31',
  yearDefaultValue: '2050',
  yearInvalid: true,
  inversed: true,
};
InvertedMultiInputDateField.parameters = {
  baseInverse: true,
};
