import React from 'react';
import ThirdPartyExternalLink from './ThirdPartyExternalLink';

export default {
  title: 'Components/ThirdPartyExternalLink',
  component: ThirdPartyExternalLink,
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    href: { control: 'text' },
    learnMoreUrl: { control: 'text' },
    origin: { control: 'text' },
  },
};

const Template = (args) => <ThirdPartyExternalLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Link to external site',
  className: 'foo',
  href: 'https://www.google.com/',
  learnMoreUrl: 'https://design.cms.gov/components/third-party-external-link/',
  origin: 'CMS Design System',
};
