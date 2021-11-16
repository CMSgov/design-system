/* eslint no-alert: 0 */
import { Drawer, DrawerToggle } from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

class DrawerDefaultExample extends React.PureComponent {
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
          <strong>Click the link below to open the default Drawer.</strong>
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <DrawerToggle drawerOpen={this.state.showDrawer} showDrawer={() => this.toggleDrawer()}>
          Toggle a default drawer.
        </DrawerToggle>

        {this.state.showDrawer && (
          <Drawer
            footerTitle="Footer Title"
            footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
            heading="Drawer Heading"
            onCloseClick={() => this.toggleDrawer()}
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

ReactDOM.render(<DrawerDefaultExample />, document.getElementById('js-example'));
