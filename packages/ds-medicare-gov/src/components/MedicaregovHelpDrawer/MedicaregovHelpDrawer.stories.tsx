import { useState } from 'react';
import { MedicaregovHelpDrawer } from './MedicaregovHelpDrawer';
import { MedicaregovHelpDrawerToggle } from './MedicaregovHelpDrawerToggle';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import NoStoryDocTemplate from '../../../../../.storybook/docs/NoStoryDocTemplate.mdx';

const meta: Meta<typeof MedicaregovHelpDrawer> = {
  title: 'Medicare/MedicaregovHelpDrawer',
  component: MedicaregovHelpDrawer,
  argTypes: {
    ariaLabel: {
      table: {
        defaultValue: {
          summary: 'Close help drawer',
        },
      },
    },
    children: {
      control: 'text',
      type: {
        name: 'ReactNode' as 'string',
        required: true,
      },
    },
    headingLevel: {
      table: {
        defaultValue: {
          summary: '3',
        },
      },
    },
  },
  args: {
    footerTitle: 'Footer Title',
    footerBody: <p className="ds-text-body--md ds-u-margin--0">Footer content</p>,
    heading: 'Drawer Heading',
  },
  // The Drawer was overlapping the docs page, so customizing the docs page to remove the examples
  parameters: {
    theme: 'medicare',
    docs: {
      page: NoStoryDocTemplate,
      underlyingHtmlElements: ['dialog'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof MedicaregovHelpDrawer>;

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

export const HelpDrawerToggleWithDrawer: Story = {
  render: function Component(args) {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const showDrawer = () => setIsDrawerVisible(true);
    const hideDrawer = (...params) => {
      action('onCloseClick')(...params);
      setIsDrawerVisible(false);
    };

    return (
      <>
        <MedicaregovHelpDrawer
          {...args}
          onCloseClick={hideDrawer}
          heading="Drawer Heading"
          isOpen={isDrawerVisible}
        >
          {args.children || drawerContent}
        </MedicaregovHelpDrawer>
        <MedicaregovHelpDrawerToggle
          showDrawer={showDrawer}
          helpDrawerOpen={isDrawerVisible || false}
        >
          Drawer Toggle
        </MedicaregovHelpDrawerToggle>
      </>
    );
  },
};

export const HelpDrawerToggleOnDark: Story = {
  render: function Component() {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const showDrawer = () => setIsDrawerVisible(true);
    const hideDrawer = (...params) => {
      action('onCloseClick')(...params);
      setIsDrawerVisible(false);
    };

    return (
      <>
        <MedicaregovHelpDrawer
          onCloseClick={hideDrawer}
          heading="Drawer Heading"
          isOpen={isDrawerVisible}
        >
          {drawerContent}
        </MedicaregovHelpDrawer>
        <MedicaregovHelpDrawerToggle
          showDrawer={showDrawer}
          helpDrawerOpen={isDrawerVisible || false}
          className="ds-c-button--on-dark"
        >
          Drawer Toggle
        </MedicaregovHelpDrawerToggle>
      </>
    );
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};
