/**
 * A "page" is generated from a top-level KSS comment block (ie. one that
 * doesn't have a parent reference), or a Markdown file.
 */
import PageBlock from './PageBlock';
import PageHeader from './PageHeader';
import PropTypes from 'prop-types';
import React from 'react';
import { TabPanel, Tabs } from '@cmsgov/design-system-core';

class Page extends React.PureComponent {
  nestedSections() {
    if (this.props.sections.length && this.props.depth >= 2) {
      //  Sort nested sections by their position in the file
      let sections = this.props.sections.concat([])
        .sort((a, b) => a.source.line - b.source.line);

      return sections.map(section => (
        <PageBlock key={section.referenceURI} {...section} />
      ));
    }
  }

  render() {
    return (
      <div>
        <PageHeader {...this.props} />

        <Tabs tablistClassName='ds-u-padding-left--6 ds-u-fill--gray-lightest'>
          <TabPanel
            className='ds-u-border--0 ds-u-padding-x--6 ds-u-padding-top--0'
            id='code'
            tab='Code'
          >
            <PageBlock {...this.props} hideHeader />
            {this.nestedSections()}
          </TabPanel>
          <TabPanel
            className='ds-u-border--0 ds-u-padding-x--6 ds-u-padding-top--3'
            id='guidance'
            tab='Guidance'
          >
            <h1 className='h2'>Accessibility</h1>
            <ul className='ds-c-list'>
              <li>Use an anchor link (<code>a</code>) to create the tabs. This allows you to link directly to a tab, and allows you to progressively enhance the page, retaining default browser behavior like opening links in a new window. Note: You need to implement the logic for selecting the correct tab based on the current URL.</li>
            </ul>
          </TabPanel>
        </Tabs>
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
