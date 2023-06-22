import React from 'react';
/* eslint-disable react/no-danger */
import ReactDOMServer from 'react-dom/server';
import ExampleFooter from './ExampleFooter';

interface EmbeddedExampleProps {
  children: React.ReactElement;
}

/**
 * Shows a code example as its rendered form as well as the HTML that is rendered for it
 *
 * Using ReactDOMServer's renderToString function to extract the HTML from a React child
 * @see https://reactjs.org/docs/react-dom-server.html#rendertostring
 */
const EmbeddedExample = ({ children }: EmbeddedExampleProps) => {
  const html = ReactDOMServer.renderToString(children);

  return (
    <section className="c-embedded-example">
      <div className="ds-u-border--1 ds-u-padding--2">{children}</div>
      <ExampleFooter />
    </section>
  );
};

export default EmbeddedExample;
