import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

class PageHeader extends React.PureComponent {
  uswdsLink() {
    if (this.props.uswds) {
      return <a href={this.props.uswds}>View related U.S. Web Design Standard</a>;
    }
  }

  statusBadge() {
    if (this.props.status) {
      const classes = classNames(
        'ds-c-badge ds-u-margin-right--1 ds-u-text-transform--capitalize',
        {
          'ds-c-badge--success': this.props.status === 'Ready',
          'ds-c-badge--alert': this.props.status === 'Draft'
        }
      );

      return <span className={classes}>{this.props.status}</span>;
    }
  }

  guidanceLink() {
    if (this.props.showGuidanceLink) {
      return (
        <a className="ds-u-margin-right--2" href="#guidance">
          Jump to guidance
        </a>
      );
    }
  }

  render() {
    return (
      <header className="ds-u-padding--3 ds-u-sm-padding--6 ds-u-display--block ds-u-fill--gray-lightest">
        <h1
          className="ds-display"
          dangerouslySetInnerHTML={{ __html: this.props.header }}
          id={this.props.reference}
        />
        <div className="ds-u-clearfix" />
        <div className="ds-u-font-size--small">
          {this.statusBadge()}

          {this.guidanceLink()}

          {this.uswdsLink()}
        </div>
      </header>
    );
  }
}

PageHeader.propTypes = {
  header: PropTypes.string.isRequired,
  reference: PropTypes.string,
  status: PropTypes.string,
  uswds: PropTypes.string,
  showGuidanceLink: PropTypes.bool.isRequired
};

export default PageHeader;
