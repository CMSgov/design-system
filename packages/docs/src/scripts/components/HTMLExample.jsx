/**
 * HTMLExample takes the markup from a KSS "Markup:" section and generates
 * a single preview and code snippet for the given markup.
 */

import Prism from 'prismjs';
import React from 'react';

class HTMLExample extends React.Component {
  // Replaces template tags
  markup() {
    let html = this.props.markup;
    const modifier = this.props.modifier ?
      ` ${this.props.modifier.className}` : '';
    const lorem = {
      s: 'We the People of the United States'
    };

    return html
      .replace(/\s?{{\s?modifier\s?}}/g, modifier)
      .replace(/\s?{{\s?lorem\-s\s?}}/g, lorem.s);
  }

  highlightedMarkup() {
    return Prism.highlight(this.markup(), Prism.languages.markup);
  }

  title() {
    if (!this.props.showTitle) return;
    const name = this.props.modifier ? this.props.modifier.className : 'Default';
    const description = this.props.modifier && this.props.modifier.description;

    return (
      <div className="markup__header">
        <h4 className="modifier__name">{name}</h4>
        <p className="modifier__desc">{description}</p>
      </div>
    );
  }

  render() {
    const markup = this.markup();

    return (
      <div className="markup markup--html">
        {this.title()}
        <div className="markup__preview"
          dangerouslySetInnerHTML={{ __html: markup }}
        />
        <pre className="markup__snippet language-markup">
          <code
            dangerouslySetInnerHTML={{ __html: this.highlightedMarkup() }} />
        </pre>
      </div>
    );
  }
}

HTMLExample.propTypes = {
  showTitle: React.PropTypes.bool,
  markup: React.PropTypes.string.isRequired,
  modifier: React.PropTypes.shape({
    className: React.PropTypes.string,
    description: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
  })
};

export default HTMLExample;
