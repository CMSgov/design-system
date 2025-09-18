import { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-skip-nav';

export default {
  title: 'Web Components/ds-skip-nav',
  argTypes: {
    'text content': {
      control: 'text',
      controlsOnly: true,
    },
    href: {
      description:
        'The anchor or target for the link (where the link will jump the user to). Note: we are using `javascript:void(0)` to prevent navigation away from this page. A typical use case might have something like `#main`',
      control: 'text',
    },
  },
  args: {
    'text content': 'Skip to main content',
    href: 'javascript:void(0)',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/skip-nav/).`,
      },
      componentEvents: {
        'ds-click': {
          description: 'An onClick handler used for manually setting focus on the content.',
        },
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = ({ 'text content': text, ...args }) => {
  useEffect(() => {
    const element = document.querySelector('ds-skip-nav');
    const handleClick = (event) => {
      return action('ds-click')(event);
    };
    element.addEventListener('ds-click', handleClick);
    return () => {
      element.removeEventListener('ds-click', handleClick);
    };
  }, []);

  return <ds-skip-nav {...args}>{text}</ds-skip-nav>;
};

export const Default = Template.bind({});
