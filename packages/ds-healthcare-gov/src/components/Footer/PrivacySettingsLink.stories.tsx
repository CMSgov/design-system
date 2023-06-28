import React from 'react';
import PrivacySettingsLink from './PrivacySettingsLink';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PrivacySettingsLink> = {
  title: 'Healthcare/PrivacySettingsLink',
  component: PrivacySettingsLink,
  args: {
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof PrivacySettingsLink>;

export const Default: Story = {};

export const CustomContent: Story = {
  args: {
    children: 'Custom privacy settings trigger',
    className: 'ds-c-button ds-c-button--solid',
  },
};
