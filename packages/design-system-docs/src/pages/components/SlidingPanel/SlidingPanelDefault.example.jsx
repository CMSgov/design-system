/* eslint no-alert: 0 */
import { SlidingPanel, SlidingPanelToggle } from '@design-system';
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
          <strong>Click the link below to open the default Sliding Panel.</strong>
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <SlidingPanelToggle panelOpen={this.state.showPanel} showPanel={() => this.togglePanel()}>
          Toggle a default help drawer.
        </SlidingPanelToggle>

        {this.state.showPanel && (
          <SlidingPanel
            footerTitle="Footer Title"
            footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
            heading="Sliding Panel Heading"
            onCloseClick={() => this.togglePanel()}
          >
            <strong>This is a default Sliding Panel component</strong>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </SlidingPanel>
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

ReactDOM.render(<SlidingPanelDefaultExample />, document.getElementById('js-example'));
