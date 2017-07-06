/**
 * A "page" is generated from a top-level KSS comment block (ie. one that
 * doesn't have a parent reference), or a Markdown file.
 */
import PageBlock from './PageBlock';
import PageHeader from './PageHeader';
import PropTypes from 'prop-types';
import React from 'react';
/* eslint-disable sort-imports */
import { Tabs, TabPanel } from '@cmsgov/design-system-core';

function isGuidanceSection(section) {
  return Boolean(section.reference.match(/\.guidance([a-z-_]+)?$/i));
}

class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleMessage = this.handleMessage.bind(this);
    this.hasTabs = (this.props.sections.length && this.props.depth >= 2);
    this.state = { iframeHeights: {} };
  }

  componentDidMount() {
    if (window) {
      window.addEventListener('message', this.handleMessage, false);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('message', this.handleMessage, false);
    }
  }

  defaultSelectedTabId() {
    if (this.guidanceSections().length &&
      typeof window !== 'undefined' &&
      window.location.hash === '#guidance') {
      return 'guidance';
    }

    return 'usage';
  }

  /**
   * Event handler for messages sent from embedded iframes
   * @param {Object} MessageEvent
   */
  handleMessage(evt) {
    if (evt.origin === window.location.origin && evt.data.name === 'reportSize') {
      this.updateIframeHeight(evt.data.id, evt.data.height);
    }
  }

  /**
   * Updates an iframes height state
   * @param {String} id - The markup page's id
   * @param {Number} height
   */
  updateIframeHeight(id, height) {
    let heights = {};
    heights[id] = height;

    this.setState({
      iframeHeights: Object.assign(this.state.iframeHeights, heights)
    });
  }

  usageSections() {
    return this.props.sections.filter(s => !isGuidanceSection(s));
  }

  guidanceSections() {
    return this.props.sections.filter(isGuidanceSection);
  }

  renderChildPageBlocks(sections) {
    if (sections.length) {
      return sections.map(section => (
        <PageBlock
          key={section.referenceURI}
          {...section}
          iframeHeights={this.state.iframeHeights}
        />
      ));
    }
  }

  renderBody() {
    return (
      <PageBlock
        {...this.props}
        iframeHeights={this.state.iframeHeights}
        hideHeader
      />
    );
  }

  renderContent() {
    if (this.hasTabs) {
      return (
        <Tabs
          defaultSelectedId={this.defaultSelectedTabId()}
          tablistClassName='ds-u-padding-left--6 ds-u-fill--gray-lightest'
        >
          <TabPanel
            className='ds-u-border--0 ds-u-padding-x--6 ds-u-padding-y--0'
            id='usage'
            tab='Usage'
          >
            {this.renderBody()}
            {this.renderChildPageBlocks(this.usageSections())}
          </TabPanel>
          {this.renderGuidanceTabPanel()}
        </Tabs>
      );
    }

    return (
      <div className='ds-u-border-top--1 ds-u-padding-x--6'>
        {this.renderBody()}
      </div>
    );
  }

  renderGuidanceTabPanel() {
    const sections = this.guidanceSections();

    if (sections.length) {
      return (
        <TabPanel
          className='ds-u-border--0 ds-u-padding-x--6 ds-u-padding-y--0'
          id='guidance'
          tab='Guidance'
        >
          {this.renderChildPageBlocks(sections)}
        </TabPanel>
      );
    }
  }

  render() {
    return (
      <div>
        <PageHeader {...this.props} />
        {this.renderContent()}
      </div>
    );
  }
}

Page.defaultProps = {
  depth: 0,
  sections: []
};

Page.propTypes = {
  depth: PropTypes.number,
  sections: PropTypes.arrayOf(
    PropTypes.shape(PageBlock.propTypes)
  )
};

export default Page;
