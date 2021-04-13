/**
 * A "page" is generated from a top-level KSS comment block (ie. one that
 * doesn't have a parent reference), or a Markdown file.
 */
import PageBlock from './PageBlock';
import PageHeader from './PageHeader';
import PropTypes from 'prop-types';
import React from 'react';
/* eslint-disable sort-imports */

function isGuidanceSection(section) {
  return Boolean(section.reference.match(/\.guidance([a-z-_]+)?$/i));
}

class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.hasTabs = this.props.sections.length && this.props.depth >= 2;
    this.horizontalPadding = {
      default: 3,
      sm: 6,
    };
    this.tabPanelClasses = `ds-u-border--0 ds-u-padding-x--${this.horizontalPadding.default} ds-u-sm-padding-x--${this.horizontalPadding.sm} ds-u-padding-y--0`;
  }

  defaultSelectedTabId() {
    if (
      this.guidanceSections().length &&
      typeof window !== 'undefined' &&
      window.location.hash === '#guidance'
    ) {
      return 'guidance';
    }

    return 'usage';
  }

  usageSections() {
    return this.props.sections.filter((s) => !isGuidanceSection(s));
  }

  guidanceSections() {
    return this.props.sections.filter(isGuidanceSection);
  }

  renderChildPageBlocks(sections) {
    if (sections) {
      return sections.map((section) => <PageBlock key={section.referenceURI} {...section} />);
    }
  }

  renderBody() {
    return <PageBlock {...this.props} hideHeader />;
  }

  renderGuidanceSection() {
    const sections = this.guidanceSections();

    if (sections.length) {
      return (
        <div id="guidance">
          <h2 className="ds-u-font-size--h1">Guidance</h2>
          {this.renderChildPageBlocks(sections)}
        </div>
      );
    }
  }

  renderContent() {
    if (this.hasTabs) {
      if (this.props.view === 'guidance') {
        return (
          <div className="ds-u-border--0 ds-u-padding-x--3 ds-u-sm-padding-x--6 ds-u-padding-y--0">
            {this.renderGuidanceSection()}
          </div>
        );
      }
      if (this.props.view === 'code') {
        return (
          <div className="ds-u-border--0 ds-u-padding-x--3 ds-u-sm-padding-x--6 ds-u-padding-y--0">
            {this.renderBody()}
            {this.renderChildPageBlocks(this.usageSections())}
          </div>
        );
      }
      return (
        <div className="ds-u-border--0 ds-u-padding-x--3 ds-u-sm-padding-x--6 ds-u-padding-y--0">
          {this.renderBody()}
          {this.renderChildPageBlocks(this.usageSections())}

          {this.renderGuidanceSection()}
        </div>
      );
    }

    return (
      <div
        className={`ds-u-border-top--1 ds-u-padding-x--${this.horizontalPadding.default} ds-u-sm-padding-x--${this.horizontalPadding.sm}`}
      >
        {this.renderBody()}
      </div>
    );
  }

  render() {
    const sections = this.guidanceSections();
    return (
      <div>
        {!this.props.view && <PageHeader {...this.props} showGuidanceLink={sections.length > 0} />}
        {this.renderContent()}
      </div>
    );
  }
}

Page.defaultProps = {
  depth: 0,
  sections: [],
};

Page.propTypes = {
  depth: PropTypes.number,
  sections: PropTypes.arrayOf(PropTypes.shape(PageBlock.propTypes)),
  /**
   * URL parameters query string 'view':
   * All views exclude the left nav, site header, site footer and page title
   * - code: Page code examples only
   * - guidance: Guidance section only
   * - page: Page content with Guidance section
   */
  view: PropTypes.oneOf(['code', 'guidance', 'page']),
};

export default Page;
