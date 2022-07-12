import React from 'react';
import { Title, Subtitle, Description, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { useArgs } from '@storybook/client-api';

import Drawer from './Drawer';
import { Button } from '../Button';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    closeButtonText: {
      control: { type: 'text' },
    },
    hasFocusTrap: {
      control: { type: 'boolean' },
    },
  },
  args: {
    footerTitle: 'Footer Title',
    footerBody: <p className="ds-text ds-u-margin--0">Footer content</p>,
    heading: 'Drawer Heading',
  },
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

const Template = ({ data, ...args }) => <Drawer {...args}>{drawerContent}</Drawer>;

export const DrawerDefault = Template.bind({});
export const DrawerWithStickyPositioning = Template.bind({});
DrawerWithStickyPositioning.args = {
  isFooterSticky: true,
  isHeaderSticky: true,
};

export const DrawerToggleWithDrawer = () => {
  const [{ isDrawerVisible, ...args }, setIsDrawerVisible] = useArgs();

  return (
    <>
      {isDrawerVisible && (
        <Drawer
          {...args}
          onCloseClick={() => setIsDrawerVisible({ isDrawerVisible: false })}
          footerTitle="Footer Title"
          footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
          heading="Drawer Heading"
        >
          {drawerContent}
        </Drawer>
      )}
      <Button
        className="ds-c-drawer__toggle"
        variation="transparent"
        onClick={() => setIsDrawerVisible({ isDrawerVisible: true })}
      >
        Drawer Toggle
      </Button>
    </>
  );
};
