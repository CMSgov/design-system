import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../Alert';
import ChoiceList from './ChoiceList';

const meta: Meta<typeof ChoiceList> = {
  title: 'Components/ChoiceList',
  component: ChoiceList,
  args: {
    choices: [
      {
        label: 'Choice 1',
        value: 'A',
        defaultChecked: true,
        inputRef: () => {
          console.log('I am a ref callback being called!');
        },
      },
      { label: 'Choice 2', requirementLabel: 'Choice hint text', value: 'B' },
    ],
  },
  argTypes: {
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    requirementLabel: { control: 'text' },
    size: {
      options: [undefined, 'small'],
      control: { type: 'radio' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ChoiceList>;

export const DefaultCheckbox: Story = {
  args: {
    label: 'Check some boxes.',
    hint: 'This is some helpful hint text.',
    name: 'checkbox-choices',
    type: 'checkbox',
  },
};

export const DefaultRadio: Story = {
  args: {
    label: 'Choose an option.',
    name: 'radio-choices',
    type: 'radio',
  },
};

export const SmallOption: Story = {
  args: {
    label: 'Choose a small option.',
    name: 'size-variants',
    type: 'radio',
    size: 'small',
  },
};

export const WithError: Story = {
  args: {
    errorMessage: 'This is an example error message.',
    label: 'Choose an option.',
    name: 'radio-choices',
    type: 'radio',
  },
};

export const InverseOption: Story = {
  args: {
    label: 'Choose an option.',
    hint: 'This component is on an inversed background.',
    name: 'inverse-choices',
    type: 'checkbox',
    inversed: true,
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};

export const DisabledCheckbox: Story = {
  args: {
    label: 'Check some boxes.',
    hint: 'These checkboxes are disabled.',
    name: 'disabled-checkbox-choices',
    type: 'checkbox',
    choices: [
      { label: 'Disabled choice A', value: 'A', disabled: true },
      { label: 'Disabled choice B', value: 'B', disabled: true, defaultChecked: true },
    ],
  },
};

export const DisabledRadio: Story = {
  args: {
    label: 'Choose an option.',
    hint: 'These radio buttons are disabled.',
    name: 'disabled-radio-choices',
    type: 'radio',
    choices: [
      { label: 'Disabled choice A', value: 'A', disabled: true },
      { label: 'Disabled choice B', value: 'B', disabled: true, defaultChecked: true },
    ],
  },
};

export const ChoiceChildren: Story = {
  args: {
    name: 'radio_choices',
    type: 'radio',
    label: 'Choose an option.',
    hint: (
      <>
        This example shows choices with <em>checked children</em>.
      </>
    ),
    choices: [
      {
        label: 'Choice 1',
        value: 'A',
        defaultChecked: true,
        checkedChildren: (
          <div className="ds-c-choice__checkedChild">
            <Alert heading="You'll save more with this option">
              Based on the household information you provided, this option will give you the maximum
              savings. We are adding some filler text just to show what it looks like when you have
              a long alert as the checkedChildren of a Choice component.
            </Alert>
          </div>
        ),
      },
      {
        label: 'Choice 2',
        requirementLabel: 'Choice hint text',
        value: 'B',
        checkedChildren: (
          <div className="ds-c-choice__checkedChild">
            <Alert variation="warn" heading="Are you sure?">
              Based on the household information you provided, you can actually save more with the
              other option. You are free to change this at any point during the application process
              until you have signed and submitted your final application.
            </Alert>
          </div>
        ),
      },
    ],
  },
};
