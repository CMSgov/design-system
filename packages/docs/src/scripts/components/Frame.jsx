import PropTypes from 'prop-types';
import React from 'react';
import debounce from 'lodash/debounce';

class Frame extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
    this.handleLoad = this.handleLoad.bind(this);
    this.handleResize = debounce(this.handleResize.bind(this), 100);
  }

  componentDidMount() {
    if (window) window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    if (window) window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setHeight();
  }

  handleLoad() {
    this.setHeight();
    if (this.props.onLoad) this.props.onLoad();
  }

  setHeight() {
    const doc = this.iframe.contentDocument;
    const height = doc.body.offsetHeight;

    if (height !== this.state.height) {
      this.setState({ height: height });
    }
  }

  render() {
    return (
      <iframe
        className='frame'
        frameBorder='0'
        height={this.state.height}
        onLoad={this.handleLoad}
        ref={iframe => { this.iframe = iframe; }}
        src={this.props.src}
        title={this.props.title}
        width='100%'
      />
    );
  }
}

Frame.propTypes = {
  onLoad: PropTypes.func,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Frame;
