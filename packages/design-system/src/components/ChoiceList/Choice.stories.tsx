import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Choice from './Choice';
import { Alert } from '../Alert';

const meta: Meta<typeof Choice> = {
  title: 'Components/Choice',
  component: Choice,
  args: {
    name: 'attestation',
    value: 'attestation',
    type: 'checkbox',
    label: 'I agree to the above terms and conditions',
    hint: 'This is some additional hint text',
    errorMessage: 'You must agree to the terms and conditions before continuing',
    defaultChecked: false,
  },
};
export default meta;

type Story = StoryObj<typeof Choice>;

export const Default: Story = {};

export const CheckedChildren: Story = {
  args: {
    defaultChecked: true,
    checkedChildren: (
      <Alert heading="You'll save more with this option" className="ds-c-choice__checkedChild">
        Based on the household information you provided, this option will give you the maximum
        savings. We are adding some filler text just to show what it looks like when you have a long
        alert as the checkedChildren of a Choice component.
      </Alert>
    ),
  },
};
