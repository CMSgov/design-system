import MonthPicker from './MonthPicker';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MonthPicker> = {
  title: 'Components/MonthPicker',
  component: MonthPicker,
  args: {
    hint: "Month Picker can receive optional help text, giving the user additional information of what's required.",
    inversed: false,
  },
  argTypes: {
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    requirementLabel: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof MonthPicker>;

export const Default: Story = {
  args: {
    name: 'DefaultMonthPicker',
    label: 'Select a month from Default Month Picker.',
  },
};

export const Selected: Story = {
  args: {
    name: 'SelectedMonthPicker',
    label: 'Select additional months from Selected Month Picker.',
    hint: 'Preselected values are `readonly` when `selectedMonths` property is used. For mutable values, use the `defaultSelectedMonths` property.',
    selectedMonths: [1, 2, 3, 4, 5, 6],
  },
};

export const Disabled: Story = {
  args: {
    name: 'DisabledMonthPicker',
    label: 'Select available months from Disabled Month Picker.',
    disabledMonths: [7, 8, 9, 10, 11, 12],
  },
};

export const WithError: Story = {
  args: {
    errorMessage: 'There was a problem with your selection.',
    name: 'WithErrorMonthPicker',
    label: 'Select available months.',
    selectedMonths: [2],
  },
};

export const Inverse: Story = {
  args: {
    name: 'InverseMonthPicker',
    label: 'Select a month from Inverse Month Picker.',
    inversed: true,
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};

export const InverseSelected: Story = {
  args: {
    name: 'InverseSelectedMonthPicker',
    label: 'Select additional months from Inverse Selected Month Picker.',
    hint: 'Preselected values are `readonly` when `selectedMonths` property is used. For mutable values, use the `defaultSelectedMonths` property.',
    inversed: true,
    selectedMonths: [1, 2, 3, 4, 5, 6],
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};

export const InverseDisabled: Story = {
  args: {
    name: 'InverseDisabledMonthPicker',
    label: 'Select available months from Inverse Disabled Month Picker.',
    inversed: true,
    disabledMonths: [7, 8, 9, 10, 11, 12],
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};

// I don't technically need to define the label/months in option
// as I can use `value` to determine this
// But the option parser requires a label/children to work
const options = (
  <>
    <option value="1">Jan</option>
    <option value="2">Feb</option>
    <option value="3">Mar</option>
    <option value="4">Apr</option>
    <option value="5">May</option>
    <option value="6">Jun</option>
    <option value="7">Jul</option>
    <option value="8">Aug</option>
    <option value="9">Sep</option>
    <option value="10" selected>
      Oct
    </option>
    <option value="11" selected disabled>
      Nov
    </option>
    <option value="12" disabled>
      Dec
    </option>
  </>
);

export const HtmlOptions: Story = {
  args: {
    name: 'HTMLOptionsMonthPicker',
    label: 'Select each of your birthday months from Foo Month Picker.',
    children: options,
  },
};
