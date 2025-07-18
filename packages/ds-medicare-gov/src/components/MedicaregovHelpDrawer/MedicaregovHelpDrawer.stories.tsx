import { ArgTypes, Description, Primary, Subtitle, Title } from '@storybook/blocks';
import { useState } from 'react';
// Need this in order for the generated ArgsTable to work
import { HelpDrawer as CoreHelpDrawer } from '@cmsgov/design-system';
import { MedicaregovHelpDrawer } from './MedicaregovHelpDrawer';
import { MedicaregovHelpDrawerToggle } from './MedicaregovHelpDrawerToggle';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MedicaregovHelpDrawer> = {
  title: 'Medicare/HelpDrawer',
  component: CoreHelpDrawer,
  argTypes: {
    // @ts-ignore - Types are messed up for this story
    backdropClickExits: {
      // Until this pattern has solidified, we're not going to advertize this feature.
      table: {
        disable: true,
      },
    },
  },
  args: {
    heading: 'Drawer Heading',
  },
  parameters: {
    theme: 'medicare',
    docs: {
      // Customize so we can exclude the backdropClickExits
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgTypes exclude={['backdropClickExits']} />
        </>
      ),
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
