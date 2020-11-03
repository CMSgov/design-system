import React from 'react';
import ReactDOM from 'react-dom';
import { UsaBanner } from '@cmsgov/design-system';

class Example extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isBannerOpen: false };
    this.handleToggleBanner = this.handleToggleBanner.bind(this);
  }

  handleToggleBanner() {
    this.setState({ isBannerOpen: !this.state.isBannerOpen });
  }

  render() {
    return (
      <UsaBanner isBannerOpen={this.state.isBannerOpen} onToggleBanner={this.handleToggleBanner} />
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('js-example'));
