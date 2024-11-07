import { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { action } from '@storybook/addon-actions';
import { webComponentDecorator } from '../storybook';
import { useArgs } from '@storybook/preview-api';
import './ds-pagination';

export default {
  title: 'Web Components/ds-pagination',
  argTypes: {
    'class-name': {
      description: 'Additional classes to be added to the root element. Optional.',
      control: 'text',
    },
    compact: {
      description: 'Set to "true" to render a compact layout. Optional.',
      control: 'boolean',
    },
    'current-page': {
      description: 'An integer representing active page number in the pagination results.',
      control: 'number',
    },
    'heading-aria-label': {
      description:
        'Defines `aria-label` on the screen-reader heading for this element, which precedes the page count readout. Since this exists on a `<nav>` element, the word "navigation" should be omitted from this label. Optional.',
      control: 'text',
    },
    'heading-level': {
      description:
        'Heading type to override default `<h2>` used in the screen-reader heading. Optional.',
      options: ['1', '2', '3', '4', '5', '6'],
      control: { type: 'select' },
    },
    'is-navigation-hidden': {
      description: 'Set to "true" to hide instead of disable navigation buttons. Optional.',
      control: 'boolean',
    },
    hrefTemplate: {
      description:
        "A string used to generate URLs for each page link. The component will find any instance of `{page}` and replace it with the page number. Defaults to `'#page={page}'`.",
      control: 'text',
    },
    'start-label-text': {
      description: 'Sets custom label on start navigation. Added for language support. Optional.',
      control: 'text',
    },
    'start-aria-label': {
      description:
        'Sets custom ARIA label on start navigation. Added for language support. Label structure should be the equivalent of: Previous Page. Optional.',
      control: 'text',
    },
    'end-label-text': {
      description: 'Sets custom label on end navigation. Added for language support. Optional.',
      control: 'text',
    },
    'end-aria-label': {
      description:
        'Sets custom ARIA label on end navigation. Added for language support. Label structure should be the equivalent of: Next Page. Optional.',
      control: 'text',
    },
    'total-pages': {
      description: 'An integer representing total number of pages in the pagination results.',
      control: 'number',
    },
  },
  args: {
    'current-page': 1,
    'total-pages': 15,
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/month-picker/).',
      },
      componentEvents: {
        'ds-page-change': {
          description:
            'Dispatched whenever page link is clicked, including the previous and next buttons.',
          eventObjectDescription:
            '`event.details.target` - The `target` of the original event\n\n`event.details.page` - An integer representing the newly active page number',
        },
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = (args) => {
  const [{ 'current-page': currentPage }, updateArgs] = useArgs();

  useEffect(() => {
    const onChange = (event) => {
      event.preventDefault();
      action('ds-page-change')(event);
      updateArgs({ 'current-page': event.detail.page });
    };
    const pagination = document.querySelector('ds-pagination');
    pagination.addEventListener('ds-page-change', onChange);
    return () => {
      pagination.removeEventListener('ds-page-change', onChange);
    };
  });

  return <ds-pagination {...args} current-page={currentPage} />;
};

export const Default = Template.bind({});
