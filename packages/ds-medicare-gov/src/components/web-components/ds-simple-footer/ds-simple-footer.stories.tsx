import type { Meta } from '@storybook/react';
import { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../../../../../design-system/src/components/web-components/storybook';
import './ds-simple-footer';

const meta: Meta = {
  title: 'Medicare/Web Components/ds-simple-footer',
  decorators: [webComponentDecorator],
  parameters: {
    theme: 'medicare',
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/footer/medicare-footer).',
      },
      componentEvents: {
        'ds-link-click-analytics': {
          description: 'A callback function triggered when the user clicks a link in the footer.',
        },
      },
    },
  },
  argTypes: {
    'about-medicare-label': {
      description: 'Label for the "About" link.',
      control: 'text',
      defaultValue: { summary: 'About' },
    },
    'nondiscrimination-label': {
      description: 'Label for the "Accessibility" link.',
      control: 'text',
      defaultValue: { summary: 'Accessibility' },
    },
    'privacy-policy-label': {
      description: 'Label for the "Privacy policy" link.',
      control: 'text',
      defaultValue: { summary: 'Privacy policy' },
    },
    'privacy-setting-label': {
      description: 'Label for the "Privacy setting" link.',
      control: 'text',
      defaultValue: { summary: 'Privacy setting' },
    },
    'linking-policy-label': {
      description: 'Label for the "Linking policy" link.',
      control: 'text',
      defaultValue: { summary: 'Linking policy' },
    },
    'using-this-site-label': {
      description: 'Label for the "Using this site" link.',
      control: 'text',
      defaultValue: { summary: 'Using this site' },
    },
    'plain-writing-label': {
      description: 'Label for the "Plain writing" link.',
      control: 'text',
      defaultValue: { summary: 'Plain writing' },
    },
    'website-info': {
      description:
        'Text describing the website’s management and funding, typically displayed in the footer. Defaults to a standard message indicating CMS ownership.',
      control: 'text',
      defaultValue: {
        summary:
          'A federal government website managed and paid for by the U.S. Centers for Medicare and Medicaid Services.',
      },
    },
    language: {
      description:
        "Language for the 'Privacy Setting' modal. See Tealium documentation for more information.",
      control: 'text',
      defaultValue: { summary: 'en' },
    },
  },
};

const Template = (args) => {
  useEffect(() => {
    const footer = document.querySelector('ds-simple-footer');
    // Adding custom event listeners to open links in new tabs, allowing us to log and verify
    // the `ds-click-link-analytics` event in Storybook actions.
    const links = footer?.querySelectorAll('a');
    links?.forEach((link) => {
      link.setAttribute('target', '_blank');
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(link.href, '_blank');
      });
    });

    const handleAnalyticsEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      event.preventDefault();
      action('ds-click-link-analytics')(customEvent);
    };

    footer.addEventListener('ds-click-link-analytics', handleAnalyticsEvent);

    return () => {
      links?.forEach((link) => {
        link.removeEventListener('click', (e) => e.preventDefault());
      });
      footer.removeEventListener('ds-click-link-analytics', handleAnalyticsEvent);
    };
  }, []);
  return <ds-simple-footer {...args}></ds-simple-footer>;
};

export const Default = Template.bind({});

export default meta;
