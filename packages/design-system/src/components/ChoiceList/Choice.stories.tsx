import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Choice from './Choice';

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
