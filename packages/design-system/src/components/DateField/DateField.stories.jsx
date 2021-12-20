import React, { useState } from 'react';
import DateField from './DateField';
import DateInput from './DateInput';

export default {
  title: 'Components/DateField',
  component: DateField,
  argTypes: {
    label: { control: false },
    errorMessage: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#fff',
        },
        {
          name: 'Hcgov dark',
          value: '#112e51',
        },
        {
          name: 'Mgov dark',
          value: '#146a5d',
        },
      ],
    },
  },
  subcomponents: { DateInput },
};

const Template = ({ ...args }) => <DateField {...args} />;
const ControlledTemplate = ({ ...args }) => {
  const [dateState, setDateState] = useState({ month: '10', day: '30', year: '1980' });

  return (
    <DateField
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

export const DateFieldDefault = Template.bind({});
DateFieldDefault.args = {
  errorMessage: 'Please enter a year in the past',
  monthDefaultValue: '10',
  dayDefaultValue: '31',
  yearDefaultValue: '2050',
  yearInvalid: true,
};

export const ControlledDateField = ControlledTemplate.bind({});

export const InvertedDateField = Template.bind({});
InvertedDateField.args = {
  errorMessage: 'Please enter a year in the past',
  monthDefaultValue: '10',
  dayDefaultValue: '31',
  yearDefaultValue: '2050',
  yearInvalid: true,
  inversed: true,
};
InvertedDateField.parameters = {
  backgrounds: { default: process.env.STORYBOOK_DS === 'mgov' ? 'Mgov dark' : 'Hcgov dark' },
};
