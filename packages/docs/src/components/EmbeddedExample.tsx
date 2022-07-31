/* eslint-disable react/no-danger */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import useCodeSnippet from './useCodeSnippet';

interface EmbeddedExampleProps {
  /**
   * Need to provide a static, unique id that won't cause hydration mismatches
   * until we are using React 18 and have access to the `useId` hook
   */
  id: string;
  children: React.ReactElement;
}

/**
 * Shows a code example as its rendered form as well as the HTML that is rendered for it
 *
 * Using ReactDOMServer's renderToString function to extract the HTML from a React child
 * @see https://reactjs.org/docs/react-dom-server.html#rendertostring
 */
const EmbeddedExample = ({ id, children }: EmbeddedExampleProps) => {
  const html = ReactDOMServer.renderToString(children);
  const { codeToggles, codeSnippets } = useCodeSnippet({ id, html });

  return (
    <section className="c-embedded-example">
      <div className="ds-u-border--1 ds-u-padding--2">{children}</div>
      <div>{codeToggles}</div>
      {codeSnippets}
    </section>
  );
};

export default EmbeddedExample;
