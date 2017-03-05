/**
 * A "page" is generated from a top-level KSS comment block (ie. one that
 * doesn't have a parent reference).
 */
import React from 'react';
import PageBlock from './PageBlock';

class Page extends React.Component {
  childSections() {
    if (this.props.sections.length) {
      return this.props.sections.map(section => (
        <PageBlock key={section.referenceNumber} {...section} />
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

Page.propTypes = {
  sections: React.PropTypes.array
};

export default Page;
