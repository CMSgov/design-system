import type { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-review';

const meta: Meta = {
  title: 'Web Components/ds-review',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/drawer/).',
      },
      slots: {
        'edit-content': {
          description:
            'An optional node in place of the edit link. If this defined, no edit link will be shown.',
        },
      },
    },
  },
  argTypes: {
    'class-name': {
      description: 'CSS class to apply custom styles to the Review component.',
      control: 'text',
    },
    'edit-aria-label': {
      description:
        'Optional label to give screen readers longer, more descriptive text to explain the context of an edit link.',
      control: 'text',
    },
    'edit-href': {
      description: 'Href for the edit link. If this is undefined, no edit link will be shown.',
      control: 'text',
    },
    'edit-text': {
      description: 'Text for the rendered edit link.',
      control: 'text',
    },
    heading: {
      description: 'Text for the Review heading.',
      control: 'text',
    },
    'heading-level': {
      description: ' Heading type to override default `<h3>`',
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5'],
    },
  },
};

const Template = (args) => {
  return <div></div>;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
