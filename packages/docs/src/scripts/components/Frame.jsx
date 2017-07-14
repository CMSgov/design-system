import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

class Frame extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      loaded: false
    };
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
    this.setState({ loaded: true });
  }

  setHeight() {
    const doc = this.iframe.contentDocument;
    const height = doc.body.offsetHeight;

    if (height !== this.state.height) {
      this.setState({ height: height });
    }
  }

  render() {
    const frameContainerClasses = classNames('frame ds-u-border--1', {
      'frame--loading': !this.state.loaded
    });

    return (
      <div className={frameContainerClasses}>
        <iframe
          className='ds-u-valign--bottom'
          frameBorder='0'
          height={this.state.height}
          onLoad={this.handleLoad}
          ref={iframe => { this.iframe = iframe; }}
          src={this.props.src}
          title={this.props.title}
          width='100%'
        />
        <a
          className='frame__link'
          href={this.props.src}
          rel='nofollow'
          target='_blank'
          title='Open the rendered HTML in a new tab or window'
        >
          New tab
        </a>
      </div>
    );
  }
}

Frame.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Frame;
