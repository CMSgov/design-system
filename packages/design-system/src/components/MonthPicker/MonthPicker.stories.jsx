import React from 'react';
import MonthPicker from './MonthPicker';

export default {
  title: 'Components/Month Picker',
  component: MonthPicker,
  argTypes: {
    hint: { control: 'text' },
    errorMessage: { control: 'text' },
    label: { control: 'text' },
    buttonVariation: {
      description: `Variation string to be applied to buttons. See [Button component](https://design.cms.gov/components/button/#components.button.react).`,
      control: 'radio',
      options: ['solid', 'outline', 'link'],
    },
    requirementLabel: {
      description: `Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields](https://design.cms.gov/guidelines/forms/#required-and-optional-fields).`,
      control: 'radio',
      options: ['Optional', 'Required'],
    },
    inversed: {
      control: 'radio',
      options: [true, false],
    },
  },
  args: {
    hint: "Month Picker can receive optional help text, giving the user additional information of what's required.",
    inversed: false,
    errorMessage: 'Please meet form requirements.',
    errorPlacement: 'top',
  },
};

const Template = (args) => <MonthPicker {...args} />;

export const DefaultMonthPicker = Template.bind({});
DefaultMonthPicker.args = {
  name: 'DefaultMonthPicker',
  label: 'Select a month from Default Month Picker',
};

export const SelectedMonthPicker = Template.bind({});
SelectedMonthPicker.args = {
  name: 'SelectedMonthPicker',
  label: 'Select additional months from Selected Month Picker',
  hint: 'Preselected values are `readonly` when `selectedMonths` property is used. For mutable values, use the `defaultSelectedMonths` property.',
  selectedMonths: [1, 2, 3, 4, 5, 6],
};

export const DisabledMonthPicker = Template.bind({});
DisabledMonthPicker.args = {
  name: 'DisabledMonthPicker',
  label: 'Select available months from Disabled Month Picker',
  disabledMonths: [7, 8, 9, 10, 11, 12],
};

export const InverseMonthPicker = Template.bind({});
InverseMonthPicker.args = {
  name: 'InverseMonthPicker',
  label: 'Select a month from Inverse Month Picker',
  inversed: true,
};
InverseMonthPicker.parameters = {
  baseInverse: true,
};

export const InverseSelectedMonthPicker = Template.bind({});
InverseSelectedMonthPicker.args = {
  name: 'InverseSelectedMonthPicker',
  label: 'Select additional months from Inverse Selected Month Picker',
  hint: 'Preselected values are `readonly` when `selectedMonths` property is used. For mutable values, use the `defaultSelectedMonths` property.',
  inversed: true,
  selectedMonths: [1, 2, 3, 4, 5, 6],
};
InverseSelectedMonthPicker.parameters = {
  baseInverse: true,
};

export const InverseDisabledMonthPicker = Template.bind({});
InverseDisabledMonthPicker.args = {
  name: 'InverseDisabledMonthPicker',
  label: 'Select available months from Inverse Disabled Month Picker',
  inversed: true,
  disabledMonths: [7, 8, 9, 10, 11, 12],
};
InverseDisabledMonthPicker.parameters = {
  baseInverse: true,
};
