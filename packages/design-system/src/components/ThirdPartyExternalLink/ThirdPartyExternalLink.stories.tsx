import React from 'react';
import ThirdPartyExternalLink from './ThirdPartyExternalLink';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ThirdPartyExternalLink> = {
  title: 'Components/Third Party External Link',
  component: ThirdPartyExternalLink,
};
export default meta;

type Story = StoryObj<typeof ThirdPartyExternalLink>;

export const Default: Story = {
  args: {
    children: 'Link to external site',
    className: 'foo',
    href: 'https://www.google.com/',
    learnMoreUrl: 'https://design.cms.gov/components/third-party-external-link/',
    origin: 'CMS Design System',
  },
};
