/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import classnames from 'classnames';
import Prism from 'prismjs';
import { ArrowIcon } from '@cmsgov/design-system';
import parserHtml from 'prettier/parser-html';
import prettier from 'prettier';

interface CodeSnippetProps {
  /**
   * additional css class names for the wrapper element
   */
  className?: string;
  /**
   * html string to prettify, highlight and display
   */
  html: string;
}

/**
 * HTML code snippet. This component will prettify an html string and do syntax highlighting
 */
const CodeSnippet = ({ html, className }: CodeSnippetProps) => {
  const [open] = useState(false);
  const prettyHtml = prettier.format(html, {
    htmlWhitespaceSensitivity: 'ignore',
    parser: 'html',
    plugins: [parserHtml],
  });
  const highlightedContent = Prism.highlight(prettyHtml, Prism.languages.html);

  return (
    <details open={open} className={classnames('c-code-snippet', className)}>
      <summary className="ds-u-margin-y--1 ds-c-button ds-c-button--small ds-c-button--ghost ds-u-padding--1 ds-u-text-decoration--none">
        <ArrowIcon direction="right" /> Code snippet
      </summary>
      <pre className="ds-u-margin-bottom--4 ds-u-overflow--auto ds-u-padding--2 language-html">
        <code dangerouslySetInnerHTML={{ __html: highlightedContent }} className="language-html" />
      </pre>
    </details>
  );
};

export default CodeSnippet;
