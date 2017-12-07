// Import all components and reference one by name. You can optimize this using
// your build process (ie. Tree shaking in Webpack)
import { Alert, Dialog } from '@cmsgov/design-system-core';
// Import individual component. No special optimizations needed.
import Button from '@cmsgov/design-system-core/dist/components/Button/Button';
import React from 'react';
import ReactDOM from 'react-dom';

class Example extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showingDialog: false
    };

    this.handleModalToggle = this.handleModalToggle.bind(this);
  }

  handleModalToggle() {
    this.setState({ showingDialog: !this.state.showingDialog });
  }

  dialog() {
    if (!this.state.showingDialog) return null;

    const actions = [
      <Button variation="primary" key="primary">
        Dialog action
      </Button>,
      <Button
        variation="transparent"
        key="cancel"
        onClick={this.handleModalToggle}
      >
        Cancel
      </Button>
    ];

    return (
      <Dialog
        onExit={this.handleModalToggle}
        getApplicationNode={() => document.querySelector('#jsx-root')}
        title="Dialog title"
        actions={actions}
      >
        Hello world
      </Dialog>
    );
  }

  render() {
    return (
      <div>
        <Alert heading="Hello world">
          <p className="ds-c-alert__text">
            You did it! You&rsquo;ve ran the example.
          </p>
          <Button className="ds-c-button" onClick={this.handleModalToggle}>
            Show a dialog
          </Button>
          {this.dialog()}
        </Alert>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.querySelector('#jsx-root'));
