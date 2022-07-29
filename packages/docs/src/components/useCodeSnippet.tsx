/* eslint-disable react/no-danger */
import React, { useRef, useState } from 'react';
import uniqueId from 'lodash/uniqueId';
import { ArrowIcon, Button } from '@cmsgov/design-system';
import { highlightHtmlSyntax, highlightJsxSyntax } from '../helpers/syntaxHighlighting';

enum SnippetState {
  CLOSED = 'closed',
  HTML = 'html',
  JSX = 'jsx',
}

interface UseCodeSnippetProps {
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
const useCodeSnippet = ({ html, jsx }: UseCodeSnippetProps) => {
  const [snippetState, setSnippetState] = useState<SnippetState>(SnippetState.CLOSED);
  const highlightedHtml = html && highlightHtmlSyntax(html);

  const snippetIdPrefix = useRef(uniqueId('example-snippet-'));
  const getButtonId = (snippetState: SnippetState) => `${snippetIdPrefix}-${snippetState}-toggle`;
  const getSnippetId = (snippetState: SnippetState) => `${snippetIdPrefix}-${snippetState}`;

  const buttons = [
    { snippetState: SnippetState.JSX, text: 'React code' },
    { snippetState: SnippetState.HTML, text: 'HTML code' },
  ];
  const snippets = [
    { snippetState: SnippetState.JSX, code: jsx },
    { snippetState: SnippetState.HTML, code: highlightedHtml },
  ];

  return {
    codeToggles: (
      <>
        {buttons.map((buttonConfig) => (
          <Button
            key={buttonConfig.snippetState}
            variation="ghost"
            size="small"
            className="c-code-snippet-toggle ds-u-text-decoration--none"
            aria-expanded={buttonConfig.snippetState === snippetState}
            aria-controls={getSnippetId(buttonConfig.snippetState)}
            id={getButtonId(buttonConfig.snippetState)}
            onClick={() =>
              setSnippetState(
                buttonConfig.snippetState === snippetState
                  ? SnippetState.CLOSED
                  : buttonConfig.snippetState
              )
            }
          >
            <ArrowIcon direction="right" /> {buttonConfig.text}
          </Button>
        ))}
      </>
    ),
    codeSnippets: (
      <>
        {snippets.map((snippetConfig) => (
          <div
            key={snippetConfig.snippetState}
            aria-labelledby={getButtonId(snippetConfig.snippetState)}
            id={getSnippetId(snippetConfig.snippetState)}
            hidden={snippetConfig.snippetState !== snippetState}
          >
            <pre className="ds-u-margin-bottom--4 ds-u-overflow--auto ds-u-padding--2">
              <code
                dangerouslySetInnerHTML={{ __html: snippetConfig.code }}
                className={`language-${snippetConfig.snippetState}`}
              />
            </pre>
          </div>
        ))}
      </>
    ),
  };
};

export default useCodeSnippet;
