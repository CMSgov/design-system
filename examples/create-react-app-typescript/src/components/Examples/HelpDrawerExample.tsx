import { HelpDrawer, HelpDrawerToggle } from '@cmsgov/design-system';
import React, { useState } from 'react';

function HelpDrawerExample(): React.ReactElement {
  const [showHelpDrawer, setShowHelpDrawer] = useState(false);

  return (
    <div>
      <h2>Helpdrawer Example</h2>
      <div>
        <p>
          <strong>Click the link below to open the help drawer.</strong>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <HelpDrawerToggle
          helpDrawerOpen={showHelpDrawer}
          showDrawer={() => setShowHelpDrawer(true)}
        >
          Toggle the help drawer.
        </HelpDrawerToggle>
        {showHelpDrawer && (
          <HelpDrawer
            footerTitle="Footer Title"
            footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
            heading="Help Drawer Heading"
            onCloseClick={() => setShowHelpDrawer(false)}
          >
            <strong>An Explanation</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </HelpDrawer>
        )}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    </div>
  );
}

export default HelpDrawerExample;
