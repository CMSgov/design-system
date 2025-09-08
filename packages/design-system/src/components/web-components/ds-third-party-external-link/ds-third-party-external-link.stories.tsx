import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import './ds-third-party-external-link';
import { webComponentDecorator } from '../storybook';
import {
  analyticsEventDocs,
  analyticsOverrideArgTypes,
  analyticsParentDataArgTypes,
} from '../shared-attributes/storybook';

export default {
  title: 'Web Components/ds-third-party-external-link',
  argTypes: {
    children: {
      control: 'text',
      controlsOnly: true,
    },
    href: {
      description: 'The URL that the link points to.',
      control: 'text',
    },
    origin: {
      description: 'A short label identifying the third-party origin.',
      control: 'text',
    },
    'learn-more-url': {
      description:
        'Optional URL to be used for the "Learn more" link. On Medicare.gov, this value should be set to "https://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/PolicyforLinkingtoOutsideWebsites".',
      control: 'text',
    },
    'aria-described-by': {
      description: 'ID reference to provide screen readers with additional context.',
      control: 'text',
    },
    'class-name': {
      description: 'Additional CSS classes to apply to the link.',
      control: 'text',
    },
    analytics: {
      description: 'Enable or disable analytics tracking.',
      control: 'boolean',
    },
    ...analyticsOverrideArgTypes,
    ...analyticsParentDataArgTypes,
  },
  args: {
    children: 'Link to external site',
    'class-name': 'foo',
    href: 'https://www.google.com/',
    'learn-more-url': 'https://design.cms.gov/components/third-party-external-link/',
    origin: 'CMS Design System',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'Displays a link to a third-party site with optional "Learn more" text and origin tracking. [See full documentation](https://design.cms.gov/components/third-party-external-link/).',
      },
      componentEvents: {
        ...analyticsEventDocs,
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = (args) => (
  <ds-third-party-external-link {...args}>{args.children}</ds-third-party-external-link>
);

export const Default = Template.bind({});
