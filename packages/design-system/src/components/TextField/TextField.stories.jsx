import { useState } from 'react';
import TextField from './TextField';
import { DATE_MASK } from './useLabelMask';

export default {
  title: 'Components/Text Field',
  component: TextField,
  argTypes: {
    defaultValue: {
      control: { type: 'text' },
    },
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
    rows: {
      control: { type: 'number' },
    },
    size: {
      type: { name: 'string', required: false },
      description: 'Set the max-width of the input either to `small` or `medium`.',
      table: {
        type: { summary: 'string' },
      },
      control: {
        type: 'radio',
      },
      options: ['small', 'medium', 'default'],
    },
    type: {
      description:
        'HTML `input` [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#<input>_types) attribute. If you are using `type=number` please use the numeric prop instead.',
      control: { type: 'text' },
    },
  },
  args: {
    label: 'Text Field Label',
    onChange: () => {},
    name: 'text-field-story',
  },
  parameters: {},
};

const Template = ({ data, ...args }) => <TextField {...args} />;

export const SingleLineField = Template.bind({});
export const MultilineField = Template.bind({});
MultilineField.args = {
  multiline: true,
  rows: 3,
};
export const MaskedField = Template.bind({});
MaskedField.args = {
  mask: 'currency',
  label: 'Currency Field',
  inputMode: 'numeric',
};
export const ErrorField = Template.bind({});
ErrorField.args = {
  errorMessage: 'Example error message',
  hint: 'Helpful hint text',
};
export const SuccessField = Template.bind({});
SuccessField.args = {
  fieldClassName: 'ds-c-field--success',
};
export const DisabledField = Template.bind({});
DisabledField.args = {
  disabled: true,
};

export const LabelMaskedField = () => {
  const [date, setDate] = useState('');

  return (
    <>
      <TextField
        name="labelMask-date"
        label="Enter the last day of your coverage"
        hint="If you don't have it, give your best estimate. For example: 01/02/2022"
        labelMask={DATE_MASK}
        value={date}
        onChange={(event) => setDate(event.currentTarget.value)}
      />
    </>
  );
};

export const AllMaskedFields = () => {
  return (
    <>
      <TextField
        ariaLabel="Enter monthly income amount in dollars."
        labelClassName="ds-u-margin-top--0"
        label="Currency"
        mask="currency"
        inputMode="numeric"
        type="text"
        name="currency_example"
        onBlur={(evt) => console.log('Unmasked value: ', unmaskValue(evt.target.value, 'currency'))}
        defaultValue="2,500"
      />
      <TextField
        label="Phone number"
        mask="phone"
        name="phone_example"
        onBlur={(evt) => console.log('Unmasked value: ', unmaskValue(evt.target.value, 'phone'))}
        type="tel"
        defaultValue="1234567890"
      />
      <TextField
        label="Social security number (SSN)"
        mask="ssn"
        inputMode="numeric"
        type="text"
        name="ssn_example"
        onBlur={(evt) => console.log('Unmasked value: ', unmaskValue(evt.target.value, 'ssn'))}
        defaultValue="123456789"
      />
      <TextField
        label="Zip code"
        mask="zip"
        inputMode="numeric"
        type="text"
        name="zip_example"
        onBlur={(evt) => console.log('Unmasked value: ', unmaskValue(evt.target.value, 'zip'))}
        defaultValue="123456789"
      />
    </>
  );
};
