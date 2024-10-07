import type { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-drawer';
import '../ds-button';

const meta: Meta = {
  title: 'Web Components/ds-drawer',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/drawer/).',
      },
      slots: {
        'footer-body': {
          description:
            'Slot for displaying custom content in the footer area of the Drawer. This can include text, or HTML elements. Use this slot to provide additional contextual information, actions, or links within the Drawer footer.',
        },
      },
      componentEvents: {
        'ds-close-click': {
          description:
            "A callback function triggered when the user clicks the close button or presses the ESC key, provided focus trapping is active. The visibility of the drawer is managed by the parent component, which must utilize this callback to toggle the drawer's display. The drawer itself does not automatically hide.",
        },
      },
    },
  },
  argTypes: {
    'close-button-aria-label': {
      description: 'Gives more context to screen readers on the Drawer close button.',
      control: 'text',
    },
    'close-button-text': {
      description: 'Content for the close button, specified as a string.',
      control: 'text',
    },
    'close-button-variation': {
      description: 'Style variation for the close button ("solid" or "ghost").',
      control: { type: 'select' },
      options: ['solid', 'ghost'],
    },
    children: {
      description: 'Content to be rendered inside the drawer.',
      control: 'text',
    },
    'class-name': {
      description: 'CSS class to apply custom styles to the Drawer.',
      control: 'text',
    },
    'footer-body': {
      description:
        'Content to be displayed in the footer area of the Drawer. Accepts a string value, typically for simple text content. For more complex content, consider using the `footer-body` slot.',
      control: 'text',
    },
    'footer-title': {
      description: 'Title for the footer section of the Drawer.',
      control: 'text',
    },
    'has-focus-trap': {
      description: 'Enables focus trap functionality within the Drawer.',
      control: 'boolean',
    },
    heading: {
      description: 'Text for the Drawer heading. Required as the heading will be focused on mount.',
      control: 'text',
    },
    'heading-id': {
      description:
        'A unique `id` to be used on the heading element to label multiple Drawer instances.',
      control: 'text',
    },
    'heading-level': {
      description: 'Heading level type to override default `<h3>`.',
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5'],
    },
    'is-header-sticky': {
      description: 'Enables "sticky" position for the Drawer header.',
      control: 'boolean',
    },
    'is-footer-sticky': {
      description: 'Enables "sticky" position for the Drawer footer.',
      control: 'boolean',
    },
    'is-open': {
      description: 'Controls whether the Drawer is in an open state.',
      control: 'boolean',
    },
  },
};

const drawerContent = (
  <>
    <strong>An Explanation</strong>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
      ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
      qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
      fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
      officia deserunt mollit anim id est laborum.
    </p>
  </>
);

const Template = (args) => {
  const [drawerOpen, setDrawerOpen] = useState(args['is-open'] ?? false);

  useEffect(() => {
    if (args['is-open'] !== drawerOpen) {
      setDrawerOpen(args['is-open'] ?? false);
    }
  }, []);

  useEffect(() => {
    const drawerElement = document.querySelector('ds-drawer');
    const toggleButton = document.querySelector('.ds-c-drawer__toggle');

    if (drawerElement && toggleButton) {
      const handleDrawerClose = (event: Event) => {
        action('ds-close-click')(event);
        setDrawerOpen(false);
      };

      const handleDrawerOpen = () => {
        setDrawerOpen(true);
      };

      drawerElement.addEventListener('ds-close-click', handleDrawerClose as EventListener);
      toggleButton.addEventListener('click', handleDrawerOpen);

      return () => {
        drawerElement.removeEventListener('ds-close-click', handleDrawerClose as EventListener);
        toggleButton.removeEventListener('click', handleDrawerOpen);
      };
    }
  }, [drawerOpen]);

  const formattedArgs = {
    ...args,
    'is-open': drawerOpen.toString(),
  };

  const toggleButtonArgs = {
    'class-name': 'ds-c-drawer__toggle',
    variation: 'ghost',
  };

  return (
    <div>
      <ds-drawer {...formattedArgs}>
        {drawerContent}
        <div slot="footer-body">
          <p className="ds-text-body--md ds-u-margin--0">
            {args['footer-body'] ? args['footer-body'] : 'Default slotted footer content'}
          </p>
        </div>
      </ds-drawer>
      <ds-button {...toggleButtonArgs}>Click to toggle drawer</ds-button>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  heading: 'Drawer Heading',
  'footer-title': 'Footer Title',
  'footer-body': 'Footer content',
};

export default meta;
