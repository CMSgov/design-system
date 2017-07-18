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
    this.iframe.contentWindow.addEventListener('load', this.handleLoad);
  }

  componentWillUnmount() {
    this.iframe.contentWindow.removeEventListener('load', this.handleLoad);
    this.iframe.contentWindow.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setHeight();
  }

  handleLoad() {
    // Attach the resize listener after the load event has been triggered, to
    // avoid an unnecessary setHeight call in Firefox
    this.iframe.contentWindow.addEventListener('resize', this.handleResize);
    // We don't want scrollbars on the iframe. We need to set this class before
    // calculating the height since a scrollbar may affect the height
    this.iframe.contentDocument.documentElement.classList.add('ds-u-overflow--hidden');
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
