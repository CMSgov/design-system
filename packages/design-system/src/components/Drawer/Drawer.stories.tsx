import { useState } from 'react';
import { Description, Subtitle, Title } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';
import Drawer from './Drawer';
import { Button } from '../Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer as any,
  argTypes: {
    backdropClickExits: {
      // Until this pattern has solidified, we're not going to advertize this feature.
      table: {
        disable: true,
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
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
        </>
      ),
      underlyingHtmlElements: ['dialog'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

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

export const DrawerDefault: Story = {
  render: function Component(args) {
    return (
      <Drawer isOpen={true} {...args}>
        {drawerContent}
      </Drawer>
    );
  },
};
export const DrawerWithStickyPositioning: Story = {
  ...DrawerDefault,
  args: {
    isFooterSticky: true,
    isHeaderSticky: true,
  },
};

export const DrawerToggleWithDrawer: Story = {
  render: function Component(args) {
    const [drawerOpen, updateOpen] = useState(false);

    const showDrawer = () => {
      updateOpen(true);
    };

    const hideDrawer = (...params) => {
      action('onCloseClick')(...params);
      updateOpen(false);
    };

    return (
      <>
        <Drawer
          {...args}
          onCloseClick={hideDrawer}
          footerTitle="Footer Title"
          footerBody={<p className="ds-text-body--md ds-u-margin--0">Footer content</p>}
          heading="Drawer Heading"
          isOpen={drawerOpen}
        >
          {drawerContent}
        </Drawer>
        <Button className="ds-c-drawer__toggle" variation="ghost" onClick={showDrawer}>
          Drawer Toggle
        </Button>
      </>
    );
  },
};
