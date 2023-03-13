import React from 'react';
import PrivacySettingsDialog from './PrivacySettingsDialog';

export default {
  title: 'Components/PrivacySettingsDialog',
  component: PrivacySettingsDialog,
  args: {
    domain: 'Test.gov',
  },
};

const Template = (args) => <PrivacySettingsDialog {...args} />;

export const Default = Template.bind({});
