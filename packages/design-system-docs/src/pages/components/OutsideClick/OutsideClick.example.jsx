import { HelpDrawer, HelpDrawerToggle, OutsideClick } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

class HelpDrawerExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showHelp: false,
    };
  }

  handleDrawerClose() {
    this.setState({ showHelp: false });
  }

  handleDrawerOpen() {
    this.setState({ showHelp: true });
  }

  handleOutsideClick() {
    this.setState({ showHelp: false });
  }

  render() {
    return (
      <div>
        <p>
          <strong>Click the link below to open the help drawer.</strong>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <OutsideClick onOutsideClick={() => this.handleOutsideClick()}>
          <HelpDrawerToggle
            helpDrawerOpen={this.state.showHelp}
            showDrawer={() => this.handleDrawerOpen()}
          >
            Toggle the help drawer.
          </HelpDrawerToggle>
          {this.state.showHelp && (
            <HelpDrawer
              footerTitle="Footer Title"
              footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
              heading="Help Drawer Heading"
              onCloseClick={() => this.handleDrawerClose()}
            >
              <strong>An Explanation</strong>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </HelpDrawer>
          )}
        </OutsideClick>
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

ReactDOM.render(<HelpDrawerExample />, document.getElementById('js-example'));

// import { OutsideClick } from '@design-system';
// import React from 'react';
// import ReactDOM from 'react-dom';

// ReactDOM.render(
//   <div className="example--wrapper">
//     <OutsideClick
//         onOutsideClick={() => {
//           alert('You clicked outside of this component!!!');
//         }}
//       >
//         Hello World
//     </OutsideClick>
//   </div>,
//   document.getElementById('js-example')
// );
