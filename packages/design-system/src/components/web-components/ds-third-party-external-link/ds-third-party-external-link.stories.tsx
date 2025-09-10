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
      description: `External link text. Supplied as inner content of the element, not an attribute.

**Example:**
\`
<ds-third-party-external-link>
  Link text
</ds-third-party-external-link>
\``,
      control: 'text',
      table: { category: 'inner content' },
    },
    href: {
      description: 'External link url. The destination.',
      control: 'text',
    },
    origin: {
      description:
        'Text informing the user where they are. This text will appear in both the dialog heading and body.',
      control: 'text',
    },
    'learn-more-url': {
      description:
        "Specify the URL users should visit to learn more about your application's external link policy. On Medicare.gov, this value should be set to 'https://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/PolicyforLinkingtoOutsideWebsites'.",
      control: 'text',
    },
    'aria-described-by': {
      description:
        'An id of an another element on the page that provides additional descriptive content for the anchor link.',
      control: 'text',
    },
    'class-name': {
      description: 'Additional CSS classes to apply to the link.',
      control: 'text',
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

const Template = (args) => {
  const { children, ...otherAttrs } = args;
  return <ds-third-party-external-link {...otherAttrs}>{children}</ds-third-party-external-link>;
};

export const Default = Template.bind({});
