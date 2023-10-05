import React from 'react';
import TextField from './TextField';
import { unmaskValue } from './maskHelpers';
import { PHONE_MASK, SSN_MASK, ZIP_MASK, CURRENCY_MASK } from './useLabelMask';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    label: 'Text Field Label',
    onChange: action('onChange'),
    onBlur: action('onBlur'),
    name: 'text-field-story',
  },
};
export default meta;

type Story = StoryObj<typeof TextField>;

function getMaskFunction(value: string) {
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

const UncontrolledTemplate: Story = {
  render: function Component(args) {
    if (args.labelMask) {
      args.labelMask = getMaskFunction(args.labelMask as any);
    }
    return <TextField {...args} />;
  },
};

const ControlledTemplate: Story = {
  render: function Component(args) {
    const [_, updateArgs] = useArgs();
    const onChange = (event) => {
      action('onChange')(event);
      updateArgs({ value: event.currentTarget.value });
    };

    if (args.labelMask) {
      args.labelMask = getMaskFunction(args.labelMask as any);
    }

    return <TextField {...args} onChange={onChange} />;
  },
};

export const SingleLineField: Story = { ...UncontrolledTemplate };

export const MultilineField: Story = {
  ...UncontrolledTemplate,
  args: {
    multiline: true,
    rows: 3,
  },
};

export const ErrorField: Story = {
  ...UncontrolledTemplate,
  args: {
    errorMessage: 'Example error message',
    hint: 'Helpful hint text',
  },
};

export const DisabledField: Story = {
  ...UncontrolledTemplate,
  args: { disabled: true },
};

export const AllMaskedFields: Story = {
  render: function Component(args) {
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
          onBlur={(evt) =>
            console.log('Unmasked value: ', unmaskValue(evt.target.value, 'currency'))
          }
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
  },
};

export const LabelMaskedPhone: Story = {
  ...ControlledTemplate,
  args: {
    name: 'labelMask-phone',
    label: 'Enter your phone number',
    hint: 'Only enter an area code + 7 digit phone number where you can be reached.',
    labelMask: 'PHONE_MASK' as any,
    numeric: true,
  },
};

export const LabelMaskedSSN: Story = {
  ...ControlledTemplate,
  args: {
    name: 'labelMask-ssn',
    label: 'Enter your social security number',
    hint: 'Please enter your SSA administered Social Security Number',
    labelMask: 'SSN_MASK' as any,
    numeric: true,
  },
};

export const LabelMaskedPostalCode: Story = {
  ...ControlledTemplate,
  args: {
    name: 'labelMask-zipcode',
    label: 'Enter your postal service zip code',
    hint: 'Please enter your Zip Code',
    labelMask: 'ZIP_MASK' as any,
    numeric: true,
  },
};

export const LabelMaskedCurrency: Story = {
  ...ControlledTemplate,
  args: {
    name: 'labelMask-currency',
    label: 'Enter a dollar amount',
    hint: 'Please enter a dollar amount',
    labelMask: 'CURRENCY_MASK' as any,
    numeric: true,
  },
};
