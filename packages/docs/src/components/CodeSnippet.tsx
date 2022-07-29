/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import classnames from 'classnames';
import { ArrowIcon } from '@cmsgov/design-system';
import { highlightHtmlSyntax, highlightJsxSyntax } from '../helpers/syntaxHighlighting';

interface CodeSnippetProps {
  /**
   * additional css class names for the wrapper element
   */
  className?: string;
  /**
   * html string to prettify, highlight and display
   */
  html?: string;
  /**
   * jsx string to prettify, highlight and display
   */
  jsx?: string;
}

/**
 * HTML code snippet. This component will prettify an html string and do syntax highlighting
 */
const CodeSnippet = ({ html, jsx, className }: CodeSnippetProps) => {
  const [open] = useState(false);
  const highlightedHtml = highlightHtmlSyntax(html);
  const highlightedJsx = highlightJsxSyntax(jsx);

  return (
    <details open={open} className={classnames('c-code-snippet', className)}>
      <summary className="ds-u-margin-y--1 ds-c-button ds-c-button--small ds-c-button--transparent ds-u-padding--1 ds-u-text-decoration--none">
        <ArrowIcon direction="right" /> Code snippet
      </summary>
      <pre className="ds-u-margin-bottom--4 ds-u-overflow--auto ds-u-padding--2 language-html">
        <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} className="language-html" />
      </pre>
    </details>
  );
};

export default CodeSnippet;
