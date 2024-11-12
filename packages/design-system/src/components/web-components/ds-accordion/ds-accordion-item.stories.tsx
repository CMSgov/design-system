import { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import { action } from '@storybook/addon-actions';
import './ds-accordion-item';

export default {
  title: 'Web Components/ds-accordion-item',
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    'button-class-name': {
      control: 'text',
      description: 'Class to be applied to the header `<button>` of an accordion item.',
    },
    'content-class-name': {
      control: 'text',
      description: 'Class to be applied to the content `<div>` tag of an accordion item.',
    },
    'default-open': {
      description: 'Set to "true" to apply a border to the accordion content.',
      control: 'boolean',
    },
    heading: {
      control: 'text',
      description: 'Class to be applied to the outer `<div>` that contains all accordion items.',
    },
    'heading-level': {
      description: 'Heading type to override default `<h2>`',
      options: ['1', '2', '3', '4', '5', '6'],
      control: { type: 'select' },
    },
  },
  args: {
    heading: 'Detailed information',
    'heading-level': '2',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/accordion/).`,
      },
      componentEvents: {
        'ds-change': {
          description: 'Dispatched whenever the accordion is opened or closed.',
          eventObjectDescription:
            '`event.details.target` - The `HTMLButtonElement` that was pressed, from which you can get the expanded state through `getAttribute("aria-expanded")`',
        },
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = (args) => {
  useEffect(() => {
    const onChange = (event) => {
      action('ds-change')(event);
    };
    const item = document.querySelector('ds-accordion-item');
    item.addEventListener('ds-change', onChange);
    return () => {
      item.removeEventListener('ds-change', onChange);
    };
  });
  return (
    <ds-accordion-item {...args}>
      This is some detailed information inside an accordion item.
    </ds-accordion-item>
  );
};

export const Default = Template.bind({});
