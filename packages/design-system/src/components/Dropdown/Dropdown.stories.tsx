import Dropdown from './Dropdown';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: {
    name: 'dropdown-field',
  },
  argTypes: {
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    requirementLabel: { control: 'text' },
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['button'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

const dropdownOptions = [
  { label: '- Select an option -', value: '' },
  { label: 'Confederated Tribes and Bands of the Yakama Nation', value: '1' },
  { label: 'Confederated Tribes of the Chehalis Reservation', value: '2' },
  { label: 'Confederated Tribes of the Colville Reservation', value: '3' },
  { label: 'Cowlitz Indian Tribe', value: '4' },
  {
    label: 'Hoh Indian Tribe (formerly the Hoh Indian Tribe of the Hoh Indian Reservation)',
    value: '5',
  },
  {
    label:
      'Nisqually Indian Tribe (formerly the Nisqually Indian Tribe of the Nisqually Reservation)',
    value: '6',
  },
  { label: 'Lummi Tribe of the Lummi Reservation', value: '7' },
];

const htmlOptGroups = (
  <>
    <option value="">- Select an option -</option>
    <optgroup label="Group A">
      <option value="a-1">Option A-1</option>
      <option value="a-2">Option A-2</option>
      <option value="a-3">Option A-3</option>
    </optgroup>
    <optgroup label="Group B" data-extra-attribute="something">
      <option value="b-1">Option B-1</option>
      <option value="b-2">Option B-2</option>
      <option value="b-3">Option B-3</option>
    </optgroup>
  </>
);

const htmlOptions = (
  <>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
    <option value="5">Option 5</option>
    <option value="6">Option 6</option>
    <option value="7">Option 7</option>
    <option value="8" data-extra-attribute="something">
      Option 8
    </option>
  </>
);

export const Default: Story = {
  args: {
    options: dropdownOptions,
    label: 'Select your tribe name.',
  },
};

export const WithError: Story = {
  args: {
    options: dropdownOptions,
    errorMessage: 'This is an example error message.',
    hint: 'This is where you put helpful hint text.',
    label: 'Select your tribe name.',
  },
};

export const Disabled: Story = {
  args: {
    options: dropdownOptions,
    label: 'Disabled example',
    disabled: true,
  },
};

export const OptionGroups: Story = {
  args: {
    options: [
      {
        label: 'Group A',
        options: [
          { value: 'a-1', label: 'Option A-1' },
          { value: 'a-2', label: 'Option A-2' },
          { value: 'a-3', label: 'Option A-3' },
        ],
      },
      {
        label: 'Group B',
        options: [
          { value: 'b-1', label: 'Option B-1' },
          { value: 'b-2', label: 'Option B-2' },
          { value: 'b-3', label: 'Option B-3' },
        ],
      },
    ],
    label: 'Select an option.',
    hint: 'This is an option-group example.',
  },
};

export const HtmlOptionGroups: Story = {
  args: {
    options: undefined,
    label: 'Select an option.',
    hint: 'In this example, options and groups are defined as HTML.',
    children: htmlOptGroups,
  },
};

export const HtmlOptions: Story = {
  args: {
    options: undefined,
    label: 'Select an option.',
    hint: 'In this example, options defined as HTML.',
    children: htmlOptions,
  },
};

export const InverseOption: Story = {
  args: {
    options: dropdownOptions,
    errorMessage: 'This is an example error message.',
    hint: 'This component is on an inversed background.',
    label: 'Select your tribe name.',
    inversed: true,
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};

export const Controlled: Story = {
  args: {
    options: dropdownOptions,
    label: 'Select your tribe name.',
    hint: 'In this example, the selected value is controlled by the parent component.',
    value: '3',
  },
  render: function Component(args) {
    const [{ value }, updateArgs] = useArgs();
    const onChange = (event) => {
      action('onChange')(event);
      updateArgs({ value: event.currentTarget.value });
    };
    return <Dropdown {...args} value={value} onChange={onChange} />;
  },
};
