/* eslint no-alert: 0 */
import { Drawer, Button } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const DrawerDefaultExample = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  function toggle() {
    setShowDrawer(!showDrawer);
  }

  return (
    <div>
      <p>
        <strong>Click the link below to open the default Drawer.</strong>
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>

      <Button className="ds-c-drawer__toggle" variation="transparent" onClick={() => toggle()}>
        Toggle a default drawer.
      </Button>

      {showDrawer && (
        <Drawer
          footerTitle="Footer Title"
          footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
          heading="Drawer Heading"
          onCloseClick={() => setShowDrawer(false)}
        >
          <strong>This is a default Drawer component</strong>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </Drawer>
      )}

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  );
};

ReactDOM.render(<DrawerDefaultExample />, document.getElementById('js-example'));
