import PropTypes from 'prop-types';
import React from 'react';
import Source from './Source';

class PageHeader extends React.PureComponent {
  uswdsLink() {
    if (this.props.uswdsUrl) {
      return (
        <p>
          <a href={this.props.uswdsUrl}>US Web Design Standard</a>
        </p>
      );
    }
  }

  statusPill() {
    if (this.props.status) {
      return (
        <span className='ds-c-badge ds-u-float--right ds-u-margin-top--2 ds-u-text-transform--capitalize ds-u-fill--warn ds-u-color--base'>
          {this.props.status}
        </span>
      );
    }
  }

  render() {
    return (
      <heading className='ds-u-padding--6 ds-u-display--block ds-u-fill--gray-lightest'>
        {this.statusPill()}
        <h1
          className='ds-display'
          dangerouslySetInnerHTML={{ __html: this.props.header }}
          id={this.props.reference}
        />
        <div className='ds-u-clearfix' />
        <Source
          reactComponent={this.props.reactComponent}
          source={this.props.source}
        />
        {this.uswdsLink()}
      </heading>
    );
  }
}

PageHeader.propTypes = {
  header: PropTypes.string.isRequired,
  reactComponent: Source.propTypes.reactComponent,
  reference: PropTypes.string,
  source: Source.propTypes.source,
  status: PropTypes.string,
  uswdsUrl: PropTypes.string
};

export default PageHeader;
