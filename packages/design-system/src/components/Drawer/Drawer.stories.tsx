import { useState } from 'react';
import { Button } from '../Button';
import { action } from '@storybook/addon-actions';
import Drawer from './Drawer';
import NoStoryDocTemplate from '../../../../../.storybook/docs/NoStoryDocTemplate.mdx';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    backdropClickExits: {
      // Until this pattern has solidified, we're not going to advertize this feature.
      table: {
        disable: true,
      },
    },
    ariaLabel: {
      table: {
        defaultValue: {
          summary: 'Close help drawer',
        },
      },
    },
    closeButtonText: {
      table: {
        defaultValue: {
          summary: 'Close',
        },
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
    docs: {
      page: NoStoryDocTemplate,
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

export const Default: Story = {
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
          Click to toggle drawer
        </Button>
      </>
    );
  },
};
