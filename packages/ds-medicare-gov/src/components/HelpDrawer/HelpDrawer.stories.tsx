import React from 'react';
import { Title, Subtitle, Description, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import HelpDrawerToggle from './HelpDrawerToggle';
import HelpDrawer from './HelpDrawer';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof HelpDrawer> = {
  title: 'Medicare/Help Drawer',
  component: HelpDrawer,
  args: {
    heading: 'Drawer Heading',
  },
  subcomponents: { HelpDrawerToggle },
  // The Drawer was overlapping the docs page, so customizing the docs page to remove the examples
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
    theme: 'medicare',
  },
};
export default meta;

type Story = StoryObj<typeof HelpDrawer>;

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
    const [{ isDrawerVisible }, setIsDrawerVisible] = useArgs();

    return (
      <>
        {isDrawerVisible && (
          <HelpDrawer
            onCloseClick={() => setIsDrawerVisible({ isDrawerVisible: false })}
            heading="Drawer Heading"
          >
            {drawerContent}
          </HelpDrawer>
        )}
        <HelpDrawerToggle
          showDrawer={() => setIsDrawerVisible({ isDrawerVisible: true })}
          helpDrawerOpen={isDrawerVisible || false}
        >
          Drawer Toggle
        </HelpDrawerToggle>
      </>
    );
  },
};

export const HelpDrawerToggleOnDark: Story = {
  render: function Component(args) {
    const [{ isDrawerVisible }, setIsDrawerVisible] = useArgs();

    return (
      <>
        {isDrawerVisible && (
          <HelpDrawer
            onCloseClick={() => setIsDrawerVisible({ isDrawerVisible: false })}
            heading="Drawer Heading"
          >
            {drawerContent}
          </HelpDrawer>
        )}
        <HelpDrawerToggle
          showDrawer={() => setIsDrawerVisible({ isDrawerVisible: true })}
          helpDrawerOpen={isDrawerVisible || false}
          className="ds-c-button--on-dark"
        >
          Drawer Toggle
        </HelpDrawerToggle>
      </>
    );
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
  args: {
    onDark: true,
  },
};
