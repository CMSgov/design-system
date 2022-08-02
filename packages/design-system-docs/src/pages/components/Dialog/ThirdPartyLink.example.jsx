import { Button, Dialog, ExternalLinkIcon } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

class Example extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div id="App" style={{ minHeight: 300 }}>
        <Button
          href="#"
          className="ds-c-button--ghost ds-u-font-weight--normal"
          onClick={() => this.showModal()}
        >
          Link to external site
          <ExternalLinkIcon className="ds-u-margin-left--05" />
        </Button>

        {this.state.showModal && (
          <Dialog
            onExit={() => this.hideModal()}
            getApplicationNode={() => document.getElementById('App')}
            heading="You are leaving URL"
            closeButtonText=""
            actions={[
              <Button
                className="ds-c-button ds-c-button--solid"
                key="primary"
                href="https://cms.gov"
              >
                OK
              </Button>,
              <Button
                className="ds-c-button ds-c-button--ghost"
                key="cancel"
                onClick={() => this.hideModal()}
              >
                Cancel
              </Button>,
            ]}
          >
            <p>
              You are leaving URL and connecting to a 3rd party site. Please click OK to continue or
              CANCEL to stay on this site.
            </p>

            <p>
              <a href="https://www.healthcare.gov/links-to-other-sites/">
                Learn more about links to third-party sites
              </a>
              .
            </p>
          </Dialog>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('js-example'));
