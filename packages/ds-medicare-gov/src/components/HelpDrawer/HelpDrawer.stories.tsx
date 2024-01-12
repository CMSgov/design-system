import React, { useState } from 'react';
import HelpDrawerToggle from './HelpDrawerToggle';
import HelpDrawer from './HelpDrawer';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HelpDrawer> = {
  title: 'Medicare/HelpDrawer',
  component: HelpDrawer,
  args: {
    heading: 'Drawer Heading',
  },
  parameters: {
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
  render: function Component() {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const showDrawer = () => setIsDrawerVisible(true);
    const hideDrawer = (...params) => {
      action('onCloseClick')(...params);
      setIsDrawerVisible(false);
    };

    return (
      <>
        {isDrawerVisible && (
          <HelpDrawer onCloseClick={hideDrawer} heading="Drawer Heading">
            {drawerContent}
          </HelpDrawer>
        )}
        <HelpDrawerToggle showDrawer={showDrawer} helpDrawerOpen={isDrawerVisible || false}>
          Drawer Toggle
        </HelpDrawerToggle>
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
        {isDrawerVisible && (
          <HelpDrawer onCloseClick={hideDrawer} heading="Drawer Heading">
            {drawerContent}
          </HelpDrawer>
        )}
        <HelpDrawerToggle
          showDrawer={showDrawer}
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
