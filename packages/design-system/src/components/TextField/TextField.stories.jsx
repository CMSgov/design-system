import TextField from './TextField';
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
  },
  args: {
    label: 'Text Field Label',
    onChange: action('onChange'),
    onBlur: action('onBlur'),
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

const LabelMaskedField = (args) => {
  const [_, updateArgs] = useArgs();
  const onChange = (event) => {
    action('onChange')(event);
    updateArgs({ value: event.currentTarget.value });
  };

  return <TextField {...args} onChange={onChange} />;
};

LabelMaskedField.argTypes = {
  // Hide irrelevant props
  mask: { table: { disable: true } },
  type: { table: { disable: true } },
  rows: { table: { disable: true } },
};

export const LabelMaskedDate = LabelMaskedField.bind({});
LabelMaskedDate.args = {
  name: 'labelMask-date',
  label: 'Enter the last day of your coverage',
  hint: "If you don't have it, give your best estimate. For example: 01/02/2022",
  labelMask: DATE_MASK,
};

export const LabelMaskedPhone = LabelMaskedField.bind({});
LabelMaskedPhone.args = {
  name: 'labelMask-phone',
  label: 'Enter your phone number',
  hint: 'Only enter an area code + 7 digit phone number where you can be reached.',
  labelMask: PHONE_MASK,
};

export const LabelMaskedSSN = LabelMaskedField.bind({});
LabelMaskedSSN.args = {
  name: 'labelMask-ssn',
  label: 'Enter your social security number',
  hint: 'Please enter your SSA administered Social Security Number',
  labelMask: SSN_MASK,
};

export const LabelMaskedPostalCode = LabelMaskedField.bind({});
LabelMaskedPostalCode.args = {
  name: 'labelMask-zipcode',
  label: 'Enter your postal service zip code',
  hint: 'Please enter your Zip Code',
  labelMask: ZIP_MASK,
};

export const LabelMaskedCurrency = LabelMaskedField.bind({});
LabelMaskedCurrency.args = {
  name: 'labelMask-currency',
  label: 'Enter a dollar amount',
  hint: 'Please enter a dollar amount',
  labelMask: CURRENCY_MASK,
};
