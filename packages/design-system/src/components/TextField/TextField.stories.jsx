import React from 'react';
import TextField from './TextField';
import { unmaskValue } from './maskHelpers';
import { DATE_MASK, PHONE_MASK, SSN_MASK, ZIP_MASK, CURRENCY_MASK } from './useLabelMask';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';

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
    labelMask: {
      control: {
        type: 'radio',
      },
      options: ['CURRENCY_MASK', 'PHONE_MASK', 'SSN_MASK', 'ZIP_MASK'],
    },
  },
  args: {
    label: 'Text Field Label',
    onChange: action('onChange'),
    onBlur: action('onBlur'),
    name: 'text-field-story',
  },
  parameters: {},
};

function getMaskFunction(value) {
  switch (value) {
    case 'PHONE_MASK':
      return PHONE_MASK;
    case 'ZIP_MASK':
      return ZIP_MASK;
    case 'SSN_MASK':
      return SSN_MASK;
    case 'CURRENCY_MASK':
      return CURRENCY_MASK;
  }
  return undefined;
}

const UncontrolledTemplate = ({ data, ...args }) => {
  if (args.labelMask) {
    args.labelMask = getMaskFunction(args.labelMask);
  }
  return <TextField {...args} />;
};

const ControlledTemplate = (args) => {
  const [_, updateArgs] = useArgs();
  const onChange = (event) => {
    action('onChange')(event);
    updateArgs({ value: event.currentTarget.value });
  };

  if (args.labelMask) {
    args.labelMask = getMaskFunction(args.labelMask);
  }

  return <TextField {...args} onChange={onChange} />;
};

export const SingleLineField = UncontrolledTemplate.bind({});
export const MultilineField = UncontrolledTemplate.bind({});
MultilineField.args = {
  multiline: true,
  rows: 3,
};
export const ErrorField = UncontrolledTemplate.bind({});
ErrorField.args = {
  errorMessage: 'Example error message',
  hint: 'Helpful hint text',
};
export const SuccessField = UncontrolledTemplate.bind({});
SuccessField.args = {
  fieldClassName: 'ds-c-field--success',
};
export const DisabledField = UncontrolledTemplate.bind({});
DisabledField.args = {
  disabled: true,
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

const LabelMaskedField = ControlledTemplate.bind({});
LabelMaskedField.argTypes = {
  // Hide irrelevant props
  mask: { table: { disable: true } },
  type: { table: { disable: true } },
  rows: { table: { disable: true } },
};

const UncontrolledLabelMaskedField = UncontrolledTemplate.bind({});
UncontrolledLabelMaskedField.argTypes = {
  // Hide irrelevant props
  mask: { table: { disable: true } },
  type: { table: { disable: true } },
  rows: { table: { disable: true } },
};

export const LabelMaskedPhone = LabelMaskedField.bind({});
LabelMaskedPhone.args = {
  name: 'labelMask-phone',
  label: 'Enter your phone number',
  hint: 'Only enter an area code + 7 digit phone number where you can be reached.',
  labelMask: 'PHONE_MASK',
};

export const LabelMaskedSSN = LabelMaskedField.bind({});
LabelMaskedSSN.args = {
  name: 'labelMask-ssn',
  label: 'Enter your social security number',
  hint: 'Please enter your SSA administered Social Security Number',
  labelMask: 'SSN_MASK',
};

export const LabelMaskedPostalCode = LabelMaskedField.bind({});
LabelMaskedPostalCode.args = {
  name: 'labelMask-zipcode',
  label: 'Enter your postal service zip code',
  hint: 'Please enter your Zip Code',
  labelMask: 'ZIP_MASK',
};

export const LabelMaskedCurrency = LabelMaskedField.bind({});
LabelMaskedCurrency.args = {
  name: 'labelMask-currency',
  label: 'Enter a dollar amount',
  hint: 'Please enter a dollar amount',
  labelMask: 'CURRENCY_MASK',
};

export const UncontrolledLabelMaskedDate = UncontrolledLabelMaskedField.bind({});
UncontrolledLabelMaskedDate.args = {
  name: 'labelMask-date',
  label: 'Enter the last day of your coverage',
  hint: 'Use the format displayed below.',
  labelMask: 'DATE_MASK',
};

export const UncontrolledLabelMaskedCurrency = UncontrolledLabelMaskedField.bind({});
UncontrolledLabelMaskedCurrency.args = {
  name: 'labelMask-currency',
  label: 'Enter a dollar amount',
  hint: 'Please enter a dollar amount',
  labelMask: 'CURRENCY_MASK',
};
