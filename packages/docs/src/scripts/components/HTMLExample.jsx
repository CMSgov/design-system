/**
 * HTMLExample takes the markup from a KSS "Markup:" section and shows
 * a preview and code snippet for the given markup
 */
import CodeSnippet from './CodeSnippet';
import Frame from './Frame';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import processMarkup from '../shared/processMarkup';

class HTMLExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleFrameLoad = this.handleFrameLoad.bind(this);
    this.state = { frameLoaded: false };
  }

  handleFrameLoad() {
    this.setState({ frameLoaded: true });
  }

  highlightedMarkup() {
    const markup = processMarkup(this.props.markup, this.props.modifier);
    return Prism.highlight(markup, Prism.languages.markup);
  }

  snippet() {
    if (!this.props.hideMarkup) {
      return <CodeSnippet>{this.highlightedMarkup()}</CodeSnippet>;
    }
  }

  name() {
    return this.props.modifier ? this.props.modifier.className : 'Default';
  }

  title() {
    if (!this.props.showTitle) return;
    const description = this.props.modifier && this.props.modifier.description;

    return (
      <div className='c-markup__header'>
        <h4 className='ds-u-font-size--h5 ds-u-margin-bottom--0'>
          Modifier: <code>{this.name()}</code>
        </h4>
        <p
          className='ds-u-margin-bottom--1 ds-u-margin-top--0 ds-u-color--muted'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    );
  }

  render() {
    const frameContainerClasses = classNames('ds-u-border--1', {
      'frame-container--loading': !this.state.frameLoaded
    });

    let iframeURL = `/design-system/example/${this.props.reference}`;

    if (this.props.modifier) {
      iframeURL += this.props.modifier.name;
    }

    return (
      <div className={'markup markup--html'}>
        {this.title()}
        <div className={frameContainerClasses}>
          <Frame
            onLoad={this.handleFrameLoad}
            src={iframeURL}
            title={`${this.name()} example`}
          />
        </div>
        {this.snippet()}
      </div>
    );
  }
}

HTMLExample.propTypes = {
  hideMarkup: PropTypes.bool,
  markup: PropTypes.string.isRequired,
  modifier: PropTypes.shape({
    className: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string.isRequired
  }),
  reference: PropTypes.string,
  showTitle: PropTypes.bool
};

HTMLExample.defaultProps = {
  showTitle: true
};

export default HTMLExample;
