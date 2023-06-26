import React from 'react';
import { Title, Subtitle, Description } from '@storybook/addon-docs';

import Drawer from './Drawer';
import { DrawerManager, useDrawerManager } from './DrawerManager';
import { Button } from '../Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DrawerManager> = {
  title: 'Components/DrawerManager',
  component: DrawerManager,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj<typeof DrawerManager>;

const drawerContent1 = {
  heading: 'Drawer Number One',
  children: (
    <>
      <strong>Yar!</strong>
      <p>
        Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace
        holystone mizzenmast quarter crow&apos;s nest nipperkin grog yardarm hempen halter furl.
        Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.
      </p>

      <p>
        Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike
        colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers
        to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot
        yardarm spyglass sheet transom heave to.
      </p>
    </>
  ),
};

const drawerContent2 = {
  heading: 'Drawer Number Two',
  children: (
    <>
      <strong>The Cosmos Awaits</strong>
      <p>
        Radio telescope quasar bits of moving fluff Sea of Tranquility Drake Equation rogue? Network
        of wormholes descended from astronomers cosmic ocean a mote of dust suspended in a sunbeam
        from which we spring hearts of the stars? Preserve and cherish that pale blue dot stirred by
        starlight descended from astronomers of brilliant syntheses two ghostly white figures in
        coveralls and helmets are softly dancing hundreds of thousands? Vastness is bearable only
        through love invent the universe a still more glorious dawn awaits dream of the mind&apos;s
        eye not a sunrise but a galaxyrise courage of our questions and billions upon billions upon
        billions upon billions upon billions upon billions upon billions.
      </p>
    </>
  ),
};

const drawerContent3 = {
  heading: 'Drawer Number Three',
  children: (
    <>
      <strong>Space, the final frontier</strong>
      <p>
        In the last 24 hours we have seen facilities now being created for the greatest and most
        complex exploration in man&apos;s history. We have felt the ground shake and the air
        shattered by the testing of a Saturn C-1 booster rocket, many times as powerful as the Atlas
        which launched John Glenn, generating power equivalent to 10,000 automobiles with their
        accelerators on the floor. We have seen the site where the F-1 rocket engines, each one as
        powerful as all eight engines of the Saturn combined, will be clustered together to make the
        advanced Saturn missile, assembled in a new building to be built at Cape Canaveral as tall
        as a 48 story structure, as wide as a city block, and as long as two lengths of this field.
      </p>
    </>
  ),
};

const SingleDrawerWithToggle = (args) => {
  const { heading, children } = args[0];
  const { toggleClick, closeClick, isOpen } = useDrawerManager();

  return (
    <>
      {isOpen && (
        <Drawer
          {...args}
          onCloseClick={closeClick}
          footerTitle="Footer Title"
          footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
          heading={heading}
        >
          {children}
        </Drawer>
      )}
      <Button
        className="ds-c-drawer__toggle ds-u-margin-bottom--2"
        variation="ghost"
        onClick={toggleClick}
      >
        {heading}
      </Button>
    </>
  );
};

export const DrawerManagerDefault: Story = {
  render: function Component() {
    return (
      <DrawerManager>
        <SingleDrawerWithToggle {...drawerContent1} />
        <SingleDrawerWithToggle {...drawerContent2} />
        <SingleDrawerWithToggle {...drawerContent3} />
      </DrawerManager>
    );
  },
};
