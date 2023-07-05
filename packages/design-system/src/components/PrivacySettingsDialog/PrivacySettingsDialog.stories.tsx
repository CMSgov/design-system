import React from 'react';
import PrivacySettingsDialog from './PrivacySettingsDialog';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PrivacySettingsDialog> = {
  title: 'Components/PrivacySettingsDialog',
  component: PrivacySettingsDialog,
  args: {
    domain: 'Test.gov',
    privacyPolicyUrl: 'https://youtu.be/dQw4w9WgXcQ',
  },
};
export default meta;

type Story = StoryObj<typeof PrivacySettingsDialog>;

export const Default: Story = {};
