import PrivacySettingsDialog from './PrivacySettingsDialog';
import NoStoryDocTemplate from '../../../../../.storybook/docs/NoStoryDocTemplate.mdx';
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
      page: NoStoryDocTemplate,
    },
  },
};
export default meta;

type Story = StoryObj<typeof PrivacySettingsDialog>;

export const Default: Story = {};
