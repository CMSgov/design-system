import PropTypes from 'prop-types';
import React from 'react';
import Source from './Source';
import classNames from 'classnames';

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
      const classes = classNames(
        'ds-c-badge ds-u-float--right ds-u-margin-top--2 ds-u-text-transform--capitalize',
        {
          'ds-c-badge--success': this.props.status === 'recommended',
          'ds-c-badge--warn': this.props.status === 'beta',
          'ds-c-badge--alert': this.props.status === 'alpha'
        }
      );

      return (
        <span className={classes}>
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
