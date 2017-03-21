/**
 * A "page" is generated from a top-level KSS comment block (ie. one that
 * doesn't have a parent reference).
 */
import React from 'react';
import PageBlock from './PageBlock';

class Page extends React.Component {
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
  depth: React.PropTypes.number,
  sections: React.PropTypes.array
};

export default Page;
