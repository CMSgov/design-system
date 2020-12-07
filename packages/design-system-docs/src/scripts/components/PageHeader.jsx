import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

class PageHeader extends React.PureComponent {
  cmsdsAndUswdsLink() {
    if (this.props.uswds && this.props.cmsds) {
      return (
        <span>
          <span>View related guidance in the </span>
          <a href={this.props.cmsds}>CMS Design System</a>
          <span> and </span>
          <a href={this.props.uswds}>U.S. Web Design System</a>
        </span>
      );
    }
  }

  cmsdsLink() {
    if (this.props.cmsds && this.props.uswds == null) {
      return (
        <span>
          <span>View related guidance in the </span>
          <a href={this.props.cmsds}>CMS Design System</a>
        </span>
      );
    }
  }

  statusBadge() {
    if (this.props.status) {
      const classes = classNames('ds-c-badge ds-u-margin-left--1 ds-u-text-transform--capitalize', {
        'ds-c-badge--success': this.props.status === 'Ready',
        'ds-c-badge--warn': this.props.status === 'Draft',
        'ds-c-badge--error': this.props.status === 'Deprecated',
      });

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
        <div className="ds-u-display--flex ds-u-align-items--center">
          <h1
            className="ds-display ds-u-display--inline-block"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: this.props.header }}
            id={this.props.reference}
          />
          {this.statusBadge()}
        </div>
        <div className="ds-u-font-size--small">
          {this.guidanceLink()}
          {this.cmsdsLink()}
          {this.cmsdsAndUswdsLink()}
        </div>
      </header>
    );
  }
}

PageHeader.propTypes = {
  cmsds: PropTypes.string,
  header: PropTypes.string.isRequired,
  reference: PropTypes.string,
  status: PropTypes.string,
  uswds: PropTypes.string,
  showGuidanceLink: PropTypes.bool.isRequired,
};

export default PageHeader;
