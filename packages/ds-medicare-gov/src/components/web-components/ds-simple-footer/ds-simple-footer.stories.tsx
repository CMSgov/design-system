import type { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';
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
    },
    'nondiscrimination-label': {
      description: 'Label for the "Accessibility" link.',
      control: 'text',
    },
    'privacy-policy-label': {
      description: 'Label for the "Privacy policy" link.',
      control: 'text',
    },
    'privacy-setting-label': {
      description: 'Label for the "Privacy setting" link.',
      control: 'text',
    },
    'linking-policy-label': {
      description: 'Label for the "Linking policy" link.',
      control: 'text',
    },
    'using-this-site-label': {
      description: 'Label for the "Using this site" link.',
      control: 'text',
    },
    'plain-writing-label': {
      description: 'Label for the "Plain writing" link.',
      control: 'text',
    },
  },
};

const Template = (args) => {
  useEffect(() => {
    const footer = document.querySelector('ds-simple-footer');
    // Adding custom event listeners to links prevents immediate navigation, allowing us to log and verify
    // the `ds-click-link-analytics` event in storybook actions before the browser navigates away.
    const links = footer?.querySelectorAll('a');
    links?.forEach((link) => {
      link.setAttribute('target', '_blank');
      link.addEventListener('click', (e) => {
        e.preventDefault();

        setTimeout(() => {
          window.open(link.href, '_blank');
        }, 3000);
      });
    });

    const handleAnalyticsEvent = (event: CustomEvent) => {
      action('ds-click-link-analytics')(event);
    };

    footer?.addEventListener('ds-click-link-analytics', handleAnalyticsEvent);

    return () => {
      links?.forEach((link) => {
        link.removeEventListener('click', (e) => e.preventDefault());
      });
      footer?.removeEventListener('ds-click-link-analytics', handleAnalyticsEvent);
    };
  }, []);
  return <ds-simple-footer {...args}></ds-simple-footer>;
};

export const Default = Template.bind({});

export default meta;
