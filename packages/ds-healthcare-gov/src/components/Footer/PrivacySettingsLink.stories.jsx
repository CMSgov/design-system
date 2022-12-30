import React from 'react';
import PrivacySettingsLink from './PrivacySettingsLink';

export default {
  title: 'Healthcare/PrivacySettingsLink',
  component: PrivacySettingsLink,
  argTypes: {
    className: {
      control: { type: 'text' },
      type: { name: 'string', required: false },
    },
    children: { control: false },
  },
  args: {
    className: '',
  },
};

const Template = ({ data, ...args }) => <PrivacySettingsLink {...args} />;

export const Default = Template.bind({});
export const CustomContent = Template.bind({});
CustomContent.args = {
  children: 'Custom privacy settings trigger',
  className: 'ds-c-button ds-c-button--solid',
};
