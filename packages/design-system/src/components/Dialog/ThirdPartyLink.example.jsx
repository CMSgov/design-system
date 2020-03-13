import Button from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import React from 'react';
import ReactDOM from 'react-dom';

class Example extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
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
          className="ds-c-button--transparent ds-u-font-weight--normal"
          onClick={() => this.showModal()}
        >
          Link to external site
        </Button>

        {this.state.showModal && (
          <Dialog
            onExit={() => this.hideModal()}
            getApplicationNode={() => document.getElementById('App')}
            heading="You are leaving URL"
            actions={[
              <Button
                className="ds-c-button ds-c-button--primary"
                key="primary"
                href="https://cms.gov"
              >
                OK
              </Button>,
              <Button
                className="ds-c-button ds-c-button--transparent"
                key="cancel"
                onClick={() => this.hideModal()}
              >
                Cancel
              </Button>
            ]}
          >
            You are leaving URL and connecting to a 3rd party site. Please click OK to continue or
            CANCEL to stay on this site.
          </Dialog>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('js-example'));
