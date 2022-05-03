/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import Prism from 'prismjs';
import { ArrowIcon } from '@cmsgov/design-system';

interface EmbeddedExampleProps {
  children: React.ReactElement;
}

/**
 * Shows a code example as its rendered form as well as the HTML that is rendered for it
 *
 * Using ReactDOMServer's renderToString function to extract the HTML from a React child
 * @see https://reactjs.org/docs/react-dom-server.html#rendertostring
 *
 * @todo HTML formatting is not great -- look into making it better
 */
const EmbeddedExample = ({ children }: EmbeddedExampleProps) => {
  const [open] = useState(false);
  const html = ReactDOMServer.renderToString(children);
  const highlightedContent = Prism.highlight(html, Prism.languages.html);

  return (
    <section className="c-embedded-example">
      <div className="ds-u-border--1 ds-u-padding--2">{children}</div>
      <details open={open} className="c-embedded-example__details">
        <summary className="ds-u-margin-y--1 ds-c-button ds-c-button--small ds-c-button--transparent ds-u-padding--1 ds-u-text-decoration--none">
          <ArrowIcon direction="right" /> Code snippet
        </summary>
        <pre className="ds-u-margin-bottom--4 ds-u-overflow--auto ds-u-padding--2 language-html">
          <code
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
            className="language-html"
          />
        </pre>
      </details>
    </section>
  );
};

export default EmbeddedExample;
