import { useState } from 'react';
import TextField from './TextField';
import { unmaskValue } from './maskHelpers';
import { PHONE_MASK, SSN_MASK, ZIP_MASK, CURRENCY_MASK } from './useLabelMask';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    label: 'Enter some text.',
    onChange: action('onChange'),
    onBlur: action('onBlur'),
    name: 'text-field-story',
  },
  argTypes: {
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    requirementLabel: { control: 'text' },
    value: { control: 'text' },
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['input'],
    },
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
    // Updating the actual args on every keystroke is hard for Storybook to keep up with,
    // so we want to treat this story like other components of ours which can either be
    // controlled or uncontrolled. The TextField itself is always controlled by our story,
    // but whether this story is controlled by args depends on whether the user has
    // supplied a new value of the `value` arg to this story.
    const [localValue, setLocalValue] = useState();
    const value = args.value ?? localValue ?? '';
    const onChange = (event) => {
      action('onChange')(event);
      setLocalValue(event.currentTarget.value);
    };

    let labelMask = args.labelMask;
    if (labelMask) {
      labelMask = getMaskFunction(args.labelMask as any);
    }

    return <TextField {...args} labelMask={labelMask} value={value} onChange={onChange} />;
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
    errorMessage: 'This is an example error message.',
    hint: 'This is where you put helpful hint text.',
  },
};

export const DisabledField: Story = {
  ...UncontrolledTemplate,
  args: { disabled: true },
};

const disabledArg = {
  table: {
    disable: true,
  },
};

export const AllMaskedFields: Story = {
  argTypes: {
    labelMask: disabledArg,
  },
  render: function Component() {
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
    label: 'Enter your phone number.',
    hint: 'This is a 10-digit phone number where you can be reached.',
    labelMask: 'PHONE_MASK' as any,
    numeric: true,
  },
  argTypes: {
    mask: disabledArg,
  },
};

export const LabelMaskedSSN: Story = {
  ...ControlledTemplate,
  args: {
    name: 'labelMask-ssn',
    label: 'Enter your Social Security Number.',
    hint: 'This number was administered to you by the Social Security Administration.',
    labelMask: 'SSN_MASK' as any,
    numeric: true,
  },
  argTypes: {
    mask: disabledArg,
  },
};

export const LabelMaskedPostalCode: Story = {
  ...ControlledTemplate,
  args: {
    name: 'labelMask-zipcode',
    label: 'Enter your postal service ZIP code.',
    hint: 'This is the five-digit ZIP code where you receive your mail.',
    labelMask: 'ZIP_MASK' as any,
    numeric: true,
  },
  argTypes: {
    mask: disabledArg,
  },
};

export const LabelMaskedCurrency: Story = {
  ...ControlledTemplate,
  args: {
    name: 'labelMask-currency',
    label: 'Enter your estimated yearly income.',
    hint: 'This should be a dollar amount.',
    labelMask: 'CURRENCY_MASK' as any,
    numeric: true,
  },
  argTypes: {
    mask: disabledArg,
  },
};
