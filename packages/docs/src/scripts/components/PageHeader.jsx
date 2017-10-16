import PropTypes from 'prop-types';
import React from 'react';
import Source from './Source';
import classNames from 'classnames';

class PageHeader extends React.PureComponent {
  uswdsLink() {
    if (this.props.uswds) {
      return (
        <a href={this.props.uswds}>
          View related U.S. Web Design Standard
        </a>
      );
    }
  }

  statusBadge() {
    if (this.props.status) {
      const classes = classNames(
        'ds-c-badge ds-u-margin-right--1 ds-u-text-transform--capitalize',
        {
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
      <header className='ds-u-padding--3 ds-u-sm-padding--6 ds-u-display--block ds-u-fill--gray-lightest'>
        <h1
          className='ds-display'
          dangerouslySetInnerHTML={{ __html: this.props.header }}
          id={this.props.reference}
        />
        <div className='ds-u-clearfix' />
        <div className='ds-u-font-size--small'>
          {this.statusBadge()}
          <Source
            reactComponent={this.props.reactComponent}
            source={this.props.source}
          />
          {this.props.uswds && <span className='ds-u-margin-x--1'>&middot;</span>}
          {this.uswdsLink()}
        </div>
      </header>
    );
  }
}

PageHeader.propTypes = {
  header: PropTypes.string.isRequired,
  reactComponent: Source.propTypes.reactComponent,
  reference: PropTypes.string,
  source: Source.propTypes.source,
  status: PropTypes.string,
  uswds: PropTypes.string
};

export default PageHeader;
