import { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { action } from '@storybook/addon-actions';
import './ds-button';
import { webComponentDecorator } from '../storybook';
import {
  analyticsEventDocs,
  analyticsOverrideArgTypes,
  analyticsParentDataArgTypes,
} from '../shared-attributes/storybook';

const dsButtonSize = [undefined, 'big', 'small'];
const dsButtonVariation = [undefined, 'solid', 'ghost'];

export default {
  title: 'Web Components/ds-button',
  argTypes: {
    children: {
      control: 'text',
      controlsOnly: true,
    },
    'class-name': {
      description: 'Additional classes to be added to the root button element.',
      control: 'text',
    },
    'is-alternate': {
      description:
        'Applies the alternate color to a Button. By default, Button uses the `main` color.',
      control: 'boolean',
    },
    size: {
      description: 'A string corresponding to Button size classes.',
      options: dsButtonSize,
      mapping: dsButtonSize,
      control: {
        type: 'radio',
        labels: {
          undefined: 'default',
          big: 'big',
          small: 'small',
        },
      },
    },
    variation: {
      description: 'A string corresponding to Button variation classes.',
      options: dsButtonVariation,
      mapping: dsButtonVariation,
      control: {
        type: 'radio',
        labels: {
          undefined: 'default',
          ghost: 'ghost',
          solid: 'solid',
        },
      },
    },
    ...analyticsOverrideArgTypes,
    ...analyticsParentDataArgTypes,
  },
  args: {
    children: 'Your button text is here',
    variation: 'solid',
    size: 'small',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/button/).`,
      },
      componentEvents: {
        ...analyticsEventDocs,
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = (args) => {
  useEffect(() => {
    const onClick = (event) => {
      action('ds-click')(event);
    };
    const button = document.querySelector('ds-button');
    button.addEventListener('ds-click', onClick);
    return () => {
      button.removeEventListener('ds-click', onClick);
    };
  }, []);
  return <ds-button {...args}>{args.children}</ds-button>;
};

export const Default = Template.bind({});
