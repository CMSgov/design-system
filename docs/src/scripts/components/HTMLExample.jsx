import React from 'react';

class HTMLExample extends React.Component {
  /**
   * Replace {{modifier}} tag with modifier, if there is one.
   */
  markup() {
    let html = this.props.markup;
    let modifier = '';

    if (this.props.modifier) {
      modifier = this.props.modifier.name.replace(/^\./, ' ');
    }

    return html.replace(/\s?{{\s?modifier\s?}}/g, modifier);
  }

  render() {
    const markup = this.markup();

    return (
      <div className="markup markup--html">
        <div dangerouslySetInnerHTML={{ __html: markup }} />
        <code>
          <pre>{markup}</pre>
        </code>
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
