/* eslint no-alert: 0 */
import { SlidingPanel, SlidingPanelToggle } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

class SlidingPanelLayoutOptionsExample extends React.PureComponent {
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
          <strong>Click the link below to open Sliding Panel with sticky header and footer.</strong>
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <SlidingPanelToggle panelOpen={this.state.showPanel} showPanel={() => this.togglePanel()}>
          Toggle a sliding panel with sticky elements.
        </SlidingPanelToggle>

        {this.state.showPanel && (
          <SlidingPanel
            isHeaderSticky
            isFooterSticky
            footerTitle="Footer Title"
            footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
            heading="Panel Drawer Heading"
            onCloseClick={() => this.togglePanel()}
          >
            <strong>This is a Sliding Panel component with sticky elements.</strong>

            <p>
              Both or either of a Sliding Panel&apos;s header and footer can receive a{' '}
              <em>sticky</em> positioning by setting each element&apos;s respective properties.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui odit temporibus aliquid,
              accusamus dignissimos soluta iusto modi laudantium mollitia. Qui quas maiores laborum
              dolor inventore sint sapiente totam molestiae aperiam!
            </p>

            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis exercitationem
              quisquam sequi similique, perspiciatis culpa, soluta hic, cupiditate modi eaque iste
              quidem recusandae consectetur incidunt molestiae dolore! Nam, placeat ratione.
            </p>

            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores eligendi cumque
              exercitationem quisquam sit atque distinctio velit reprehenderit fuga veniam quaerat,
              deserunt assumenda suscipit quidem consequuntur excepturi eum ipsa soluta.
            </p>
          </SlidingPanel>
        )}

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, eius nihil cumque unde
          rem vel a odio architecto consequuntur accusantium laboriosam atque aperiam porro in
          laudantium cum pariatur, qui reiciendis!
        </p>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta perferendis dolor quae,
          inventore vero ipsa aliquid tempore amet ratione id beatae cupiditate laboriosam officia
          corrupti? Assumenda est praesentium quibusdam possimus.
        </p>

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

ReactDOM.render(<SlidingPanelLayoutOptionsExample />, document.getElementById('js-example'));
