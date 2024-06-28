import MonthPicker from './MonthPicker';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const meta: Meta<typeof MonthPicker> = {
  title: 'Components/MonthPicker',
  component: MonthPicker,
  args: {
    hint: "Month Picker can receive optional help text, giving the user additional information of what's required.",
    inversed: false,
  },
  argTypes: {
    selectedMonths: { control: 'multi-select', options: monthNumbers },
    defaultSelectedMonths: { control: 'multi-select', options: monthNumbers },
    disabledMonths: { control: 'multi-select', options: monthNumbers },
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    requirementLabel: { control: 'text' },
  },
  render: function Component(args) {
    if (args.selectedMonths?.length === 0) {
      args.selectedMonths = undefined;
    }
    if (args.defaultSelectedMonths?.length === 0) {
      args.defaultSelectedMonths = undefined;
    }
    if (args.disabledMonths?.length === 0) {
      args.disabledMonths = undefined;
    }
    return <MonthPicker {...args} key={JSON.stringify(args.defaultSelectedMonths)} />;
  },
};
export default meta;

type Story = StoryObj<typeof MonthPicker>;

const ControlledTemplate: Story = {
  render: function Component(args) {
    const [{ selectedMonths }, updateArgs] = useArgs();
    const onChange = (event) => {
      action('onChange')(event);
      const month = parseInt(event.currentTarget.value, 10);
      const newSelectedMonths = selectedMonths.slice();
      if (newSelectedMonths.includes(month)) {
        newSelectedMonths.splice(newSelectedMonths.indexOf(month), 1);
      } else {
        newSelectedMonths.push(month);
      }
      updateArgs({ selectedMonths: newSelectedMonths });
    };

    const onSelectAll = () => {
      const newSelectedMonths = monthNumbers.filter((m) => !args.disabledMonths?.includes(m));
      updateArgs({ selectedMonths: newSelectedMonths });
    };

    const onClearAll = () => {
      updateArgs({ selectedMonths: [] });
    };

    return (
      <MonthPicker
        {...args}
        selectedMonths={selectedMonths}
        onChange={onChange}
        onSelectAll={onSelectAll}
        onClearAll={onClearAll}
      />
    );
  },
};

export const Default: Story = {
  args: {
    name: 'DefaultMonthPicker',
    label: 'Select a month from Default Month Picker.',
  },
};

export const Controlled: Story = {
  ...ControlledTemplate,
  args: {
    name: 'SelectedMonthPicker',
    label: 'Select additional months from Selected Month Picker.',
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
  ...ControlledTemplate,
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

const elements = (
  <>
    <input type="checkbox" value="10" checked />
    <input type="checkbox" value="11" checked disabled />
    <input type="checkbox" value="12" disabled />
  </>
);

export const HtmlElements: Story = {
  args: {
    name: 'HTMLOptionsMonthPicker',
    label: 'Select each of your birthday months from Foo Month Picker.',
    children: elements,
  },
};
