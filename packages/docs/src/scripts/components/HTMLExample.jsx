/**
 * HTMLExample takes the markup from a KSS "Markup:" section and generates
 * a single preview and code snippet for the given markup.
 */

import React from 'react';

class HTMLExample extends React.Component {
  // Replaces {{modifier}} tag with className (if present)
  markup() {
    let html = this.props.markup;
    const modifier = this.props.modifier ?
      ` ${this.props.modifier.className}` : '';

    return html.replace(/\s?{{\s?modifier\s?}}/g, modifier);
  }

  title() {
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
        <pre className="markup__snippet">
          <code>
            {markup}
          </code>
        </pre>
      </div>
    );
  }
}

HTMLExample.propTypes = {
  markup: React.PropTypes.string.isRequired,
  modifier: React.PropTypes.shape({
    className: React.PropTypes.string,
    description: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
  })
};

export default HTMLExample;
