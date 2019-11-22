import BreakpointToggles from './BreakpointToggles';
import PropTypes from 'prop-types';
import React from 'react';
import breakpoints from '../shared/breakpoints';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

class Frame extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeBreakpoint: 'lg',
      iframeHeight: 0,
      loaded: false,
      // used to calculate the scale when Frame is responsive
      parentWidth: 0
    };
    this.handleIframeLoad = this.handleIframeLoad.bind(this);
    this.handleIframeResize = debounce(this.handleIframeResize.bind(this), 100);
    this.handleResize = this.handleResize.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  componentDidMount() {
    if (window && this.props.responsive) {
      window.addEventListener('resize', this.handleResize);
    }

    this.iframe.contentWindow.addEventListener('load', this.handleIframeLoad);
    this.setParentWidth();
  }

  componentWillUnmount() {
    this.iframe.contentWindow.removeEventListener('load', this.handleIframeLoad);
    this.iframe.contentWindow.removeEventListener('resize', this.handleIframeResize);
  }

  handleIframeResize() {
    this.setIframeHeight();
  }

  handleIframeLoad() {
    // Attach the resize listener after the load event has been triggered, to
    // avoid an unnecessary setHeight call in Firefox
    this.iframe.contentWindow.addEventListener('resize', this.handleIframeResize);
    // We don't want scrollbars on the iframe. We need to set this class before
    // calculating the height since a scrollbar may affect the height
    this.iframe.contentDocument.documentElement.classList.add('ds-u-overflow--hidden');
    this.setIframeHeight();
    this.setState({ loaded: true });
  }

  handleResize() {
    this.setParentWidth();
  }

  /**
   * @param {String} breakpoint - key
   */
  handleToggleClick(breakpoint) {
    this.setState({ activeBreakpoint: breakpoint });
  }

  setParentWidth() {
    const parentWidth = this.parent.offsetWidth;
    if (parentWidth !== this.state.parentWidth) {
      this.setState({ parentWidth: parentWidth });
    }
  }

  setIframeHeight() {
    const doc = this.iframe.contentDocument;
    const iframeHeight = doc.body.offsetHeight;

    if (iframeHeight !== this.state.iframeHeight) {
      this.setState({ iframeHeight: iframeHeight });
    }
  }

  render() {
    const rootClasses = classNames('frame ds-u-border--1', {
      'frame--loading': !this.state.loaded,
      'frame--responsive': this.props.responsive
    });

    const parentWidth = this.state.parentWidth;
    const previewWidth = breakpoints[this.state.activeBreakpoint];
    const scale = Math.min(1, parentWidth / previewWidth);
    const parentStyle = this.props.responsive
      ? {
          height: scale * this.state.iframeHeight
        }
      : null;
    const previewStyle = this.props.responsive
      ? {
          transform: `scale(${scale})`,
          width: previewWidth
        }
      : null;

    return (
      <div id="frame" className={rootClasses}>
        {this.props.responsive && (
          <BreakpointToggles
            activeBreakpoint={this.state.activeBreakpoint}
            onClick={this.handleToggleClick}
          />
        )}
        <div
          className="frame__parent"
          ref={el => {
            this.parent = el;
          }}
          style={parentStyle}
        >
          <div className="frame__preview" style={previewStyle}>
            <iframe
              className="ds-u-fill--white ds-u-valign--bottom"
              frameBorder="0"
              height={this.state.iframeHeight}
              ref={iframe => {
                this.iframe = iframe;
              }}
              src={this.props.src}
              title={this.props.title}
              width="100%"
            />
          </div>
        </div>
        <a
          className="frame__link"
          href={this.props.src}
          rel="nofollow"
          target="_blank"
          title="Open the rendered HTML in a new tab or window"
        >
          New tab
        </a>
      </div>
    );
  }
}

Frame.defaultProps = {
  responsive: false
};

Frame.propTypes = {
  // Display breakpoint toggles and scale the frame
  responsive: PropTypes.bool,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Frame;
