/* eslint no-alert: 0 */
import { Button, SlidingPanel, SlidingPanelToggle } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

class SlidingPanelDefaultExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showPanel: false,
    };
  }

  togglePanel() {
    this.setState({ showPanel: !this.state.showPanel });
  }

  render() {
    return (
      <div>
        <p>
          <strong>Click the link below to open a Sliding Panel with focus trap enabled.</strong>
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <SlidingPanelToggle panelOpen={this.state.showPanel} showPanel={() => this.togglePanel()}>
          Toggle a sliding panel with focus trap.
        </SlidingPanelToggle>

        {this.state.showPanel && (
          <SlidingPanel
            hasFocusTrap
            footerTitle="Footer Title"
            footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
            heading="Sliding Panel Heading"
            onCloseClick={() => this.togglePanel()}
          >
            <strong>This is a Sliding Panel component with focus trap enabled.</strong>

            <p>
              To see focus trap in action, use the <kbd>TAB</kbd> key to navigate within the Sliding
              Panel. If the property <code>hasFocusTrap</code> is <code>true</code>, focus will not
              leave the Sliding Panel; if the property is set to <code>false</code>, focus will
              leave the Sliding Panel.
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
          </SlidingPanel>
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

ReactDOM.render(<SlidingPanelDefaultExample />, document.getElementById('js-example'));
