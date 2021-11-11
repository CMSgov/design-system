/* eslint no-alert: 0 */
import { Button, Drawer, DrawerToggle } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

class DrawerFocusTrapExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDrawer: false,
    };
  }

  toggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  render() {
    return (
      <div>
        <p>
          <strong>Click the link below to open a Drawer with focus trap enabled.</strong>
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <DrawerToggle drawerOpen={this.state.showDrawer} showDrawer={() => this.toggleDrawer()}>
          Toggle a drawer with focus trap.
        </DrawerToggle>

        {this.state.showDrawer && (
          <Drawer
            hasFocusTrap
            footerTitle="Footer Title"
            footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
            heading="Drawer Heading"
            onCloseClick={() => this.toggleDrawer()}
          >
            <strong>This is a Drawer component with focus trap enabled.</strong>

            <p>
              To see focus trap in action, use the <kbd>TAB</kbd> key to navigate within the Drawer.
              If the property <code>hasFocusTrap</code> is <code>true</code>, focus will not leave
              the Drawer; if the property is set to <code>false</code>, focus will leave the Drawer.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            <Button>Inside Button (Does Nothing)</Button>
          </Drawer>
        )}

        <Button className="ds-u-margin-top--2">Outside Button (Does Nothing)</Button>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    );
  }
}

ReactDOM.render(<DrawerFocusTrapExample />, document.getElementById('js-example'));
