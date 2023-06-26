import React from 'react';
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
};
export default meta;

type Story = StoryObj<typeof ChoiceList>;

export const DefaultCheckbox: Story = {
  args: {
    label: 'Checkbox example',
    hint: 'Helpful hint text',
    name: 'checkbox_choices',
    type: 'checkbox',
  },
};

export const DefaultRadio: Story = {
  args: {
    label: 'Radio example',
    name: 'radio_choices',
    type: 'radio',
  },
};

export const SmallOption: Story = {
  args: {
    label: 'Small size example',
    name: 'size-variants',
    type: 'radio',
    size: 'small',
  },
};

export const WithError: Story = {
  args: {
    errorMessage: 'Example error message',
    label: 'Small size example',
    name: 'size-variants',
    type: 'radio',
    size: 'small',
  },
};

export const InverseOption: Story = {
  args: {
    label: 'Inverse example',
    hint: 'Helpful hint text',
    name: 'inverse_choices_field',
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
    label: 'Disabled checkbox example',
    name: 'checkbox_choices',
    type: 'checkbox',
    choices: [
      { label: 'Disabled choice A', value: 'A', disabled: true },
      { label: 'Disabled choice B', value: 'B', disabled: true, defaultChecked: true },
    ],
  },
};

export const DisabledRadio: Story = {
  args: {
    label: 'Disabled radio example',
    name: 'radio_choices',
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
    label: 'Example choices with checked children',
    choices: [
      {
        label: 'Choice 1',
        value: 'A',
        defaultChecked: true,
        checkedChildren: (
          <Alert heading="You'll save more with this option" className="ds-c-choice__checkedChild">
            Based on the household information you provided, this option will give you the maximum
            savings. We are adding some filler text just to show what it looks like when you have a
            long alert as the checkedChildren of a Choice component.
          </Alert>
        ),
      },
      {
        label: 'Choice 2',
        requirementLabel: 'Choice hint text',
        value: 'B',
        checkedChildren: (
          <Alert variation="warn" heading="Are you sure?" className="ds-c-choice__checkedChild">
            Based on the household information you provided, you can actually save more with the
            other option. You are free to change this at any point during the application process
            until you have signed and submitted your final application.
          </Alert>
        ),
      },
    ],
  },
};
