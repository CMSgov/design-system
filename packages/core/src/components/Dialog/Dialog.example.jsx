import Button from '../Button/Button';
import Dialog from './Dialog';
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
        <Button onClick={() => this.showModal()} size="big" variation="success">
          Click to show modal
        </Button>

        {this.state.showModal && (
          <Dialog
            onExit={() => this.hideModal()}
            getApplicationNode={() => document.getElementById('App')}
            title="Dialog title"
            actions={[
              <button
                className="ds-c-button ds-c-button--primary"
                key="primary"
              >
                Dialog action
              </button>,
              <button
                className="ds-c-button ds-c-button--transparent"
                key="cancel"
                onClick={() => this.hideModal()}
              >
                Cancel
              </button>
            ]}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            accumsan diam vitae metus lacinia, eget tempor purus placerat.
          </Dialog>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('js-example'));
