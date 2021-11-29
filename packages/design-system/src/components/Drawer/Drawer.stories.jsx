/* eslint-disable react/no-multi-comp */
import React from 'react';

import Drawer from './Drawer';
import DrawerToggle from './DrawerToggle';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    closeButtonText: {
      control: { type: 'text' },
    },
  },
  args: {
    footerTitle: 'Footer Title',
    footerBody: <p className="ds-text ds-u-margin--0">Footer content</p>,
    heading: 'Drawer Heading',
  },
};

const Template = ({ data, ...args }) => (
  <Drawer {...args}>
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
  </Drawer>
);

export const DrawerDefault = Template.bind({});
export const DrawerWithStickyPositioning = Template.bind({});
DrawerWithStickyPositioning.args = {
  isFooterSticky: true,
  isHeaderSticky: true,
};
export const DrawerToggleDefault = () => (
  <DrawerToggle drawerOpen={false} showDrawer={() => {}}>
    Drawer Toggle{' '}
  </DrawerToggle>
);
