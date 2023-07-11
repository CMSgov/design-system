import React from 'react';
import PrivacySettingsDialog from './PrivacySettingsDialog';
import { Title, Subtitle, Description, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PrivacySettingsDialog> = {
  title: 'Components/PrivacySettingsDialog',
  component: PrivacySettingsDialog,
  args: {
    domain: 'Test.gov',
    privacyPolicyUrl: 'https://youtu.be/dQw4w9WgXcQ',
  },
  parameters: {
    docs: {
      // The dialog was overlapping the docs page, so customizing the docs page to remove the examples
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj<typeof PrivacySettingsDialog>;

export const Default: Story = {};
