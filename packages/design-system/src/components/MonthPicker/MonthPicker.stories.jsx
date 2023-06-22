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
  },
};

const Template = (args) => <MonthPicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'DefaultMonthPicker',
  label: 'Select a month from Default Month Picker',
};

export const Selected = Template.bind({});
Selected.args = {
  name: 'SelectedMonthPicker',
  label: 'Select additional months from Selected Month Picker',
  hint: 'Preselected values are `readonly` when `selectedMonths` property is used. For mutable values, use the `defaultSelectedMonths` property.',
  selectedMonths: [1, 2, 3, 4, 5, 6],
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'DisabledMonthPicker',
  label: 'Select available months from Disabled Month Picker',
  disabledMonths: [7, 8, 9, 10, 11, 12],
};

export const WithError = Template.bind({});
WithError.args = {
  errorMessage: 'There was a problem with your selection.',
  name: 'WithErrorMonthPicker',
  label: 'Select available months.',
  selectedMonths: [2],
};

export const Inverse = Template.bind({});
Inverse.args = {
  name: 'InverseMonthPicker',
  label: 'Select a month from Inverse Month Picker',
  inversed: true,
};
Inverse.parameters = {
  // Must supply `layout: 'fullscreen'` when we use `onDark: true`
  onDark: true,
  layout: 'fullscreen',
};

export const InverseSelected = Template.bind({});
InverseSelected.args = {
  name: 'InverseSelectedMonthPicker',
  label: 'Select additional months from Inverse Selected Month Picker',
  hint: 'Preselected values are `readonly` when `selectedMonths` property is used. For mutable values, use the `defaultSelectedMonths` property.',
  inversed: true,
  selectedMonths: [1, 2, 3, 4, 5, 6],
};
InverseSelected.parameters = {
  // Must supply `layout: 'fullscreen'` when we use `onDark: true`
  onDark: true,
  layout: 'fullscreen',
};

export const InverseDisabled = Template.bind({});
InverseDisabled.args = {
  name: 'InverseDisabledMonthPicker',
  label: 'Select available months from Inverse Disabled Month Picker',
  inversed: true,
  disabledMonths: [7, 8, 9, 10, 11, 12],
};
InverseDisabled.parameters = {
  // Must supply `layout: 'fullscreen'` when we use `onDark: true`
  onDark: true,
  layout: 'fullscreen',
};
