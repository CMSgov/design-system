/**
 * HTMLExample takes the markup from a KSS "Markup:" section and generates
 * a single preview and code snippet for the given markup.
 */

import Prism from 'prismjs';
import React from 'react';

class HTMLExample extends React.PureComponent {
  // Replaces template tags
  markup() {
    let html = this.props.markup;
    const modifier = this.props.modifier
      ? ` ${this.props.modifier.className}` : '';
    const lorem = {
      s: 'We the People of the United States',
      m: 'We the People of the United States, in Order to form a more perfect Union',
      l: 'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.'
    };

    return html
      .replace(/\s?{{\s?modifier\s?}}/g, modifier)
      .replace(/\s?{{\s?lorem-s\s?}}/g, lorem.s)
      .replace(/\s?{{\s?lorem-m\s?}}/g, lorem.m)
      .replace(/\s?{{\s?lorem-l\s?}}/g, lorem.l);
  }

  highlightedMarkup() {
    return Prism.highlight(this.markup(), Prism.languages.markup);
  }

  snippet() {
    if (!this.props.hideMarkup) {
      return (
        <pre className='language-markup'>
          <code dangerouslySetInnerHTML={{ __html: this.highlightedMarkup() }} />
        </pre>
      );
    }
  }

  title() {
    if (!this.props.showTitle) return;
    const name = this.props.modifier ? this.props.modifier.className : 'Default';
    const description = this.props.modifier && this.props.modifier.description;

    return (
      <div className='c-markup__header'>
        <h4 className='ds-u-font-size--h5 ds-u-margin-bottom--0'>
          Modifier: <code>{name}</code>
        </h4>
        <p
          className='ds-u-margin-bottom--1 ds-u-margin-top--0 ds-u-color--muted'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    );
  }

  render() {
    const markup = this.markup();

    return (
      <div className='markup markup--html'>
        {this.title()}
        <div
          className='ds-u-border--1 ds-u-padding--1'
          dangerouslySetInnerHTML={{ __html: markup }}
        />
        {this.snippet()}
      </div>
    );
  }
}

HTMLExample.propTypes = {
  hideMarkup: React.PropTypes.bool,
  markup: React.PropTypes.string.isRequired,
  modifier: React.PropTypes.shape({
    className: React.PropTypes.string,
    description: React.PropTypes.string,
    name: React.PropTypes.string.isRequired
  }),
  showTitle: React.PropTypes.bool
};

HTMLExample.defaultProps = {
  showTitle: true
};

export default HTMLExample;
