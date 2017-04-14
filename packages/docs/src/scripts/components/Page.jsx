/**
 * A "page" is generated from a top-level KSS comment block (ie. one that
 * doesn't have a parent reference).
 */
import PageBlock from './PageBlock';
import PropTypes from 'prop-types';
import React from 'react';

class Page extends React.PureComponent {
  childSections() {
    if (this.props.sections.length && this.props.depth >= 2) {
      // Inline sections are sorted by their position in the file
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
        <PageBlock {...this.props} />
        {this.childSections()}
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
