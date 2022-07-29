import React, { useRef, useState } from 'react';
import CodeSnippet from './CodeSnippet';
import { ExternalLinkIcon } from '@cmsgov/design-system';
import { makeStorybookUrl } from '../helpers/urlUtils';
import { withPrefix } from 'gatsby';

interface StorybookExampleFooterProps {
  /**
   * story id from storybook url
   * example: `components-[COMPONENT_NAME]--default`
   */
  storyId: string;
  /**
   * Current theme
   */
  theme: string;
}

/**
 * Goes below storybook-based examples and allows people to view React and HTML source or
 * to click a link to go directly to the story within Storybook. Fetches the source code
 * by loading the component's Storybook docs page in an iframe and scraping the page.
 */
const StorybookExampleFooter = ({ theme, storyId }: StorybookExampleFooterProps) => {
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [reactCode, setReactCode] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>();
  const iframeUrl = withPrefix(
    `/storybook/iframe.html?id=${storyId}&viewMode=docs&globals=theme:${theme}`
  );

  const onIframeLoad = () => {
    const errorLoadingReactCode = () => setReactCode('Error loading React source');
    const errorLoadingHtmlCode = () => setHtmlCode('Error loading HTML source');

    if (!iframeRef.current) {
      errorLoadingReactCode();
      errorLoadingHtmlCode();
      return;
    }

    const storyBlockSelector = `#anchor--${storyId}`;
    const storyRootSelector = `#story--${storyId}`;
    const codeButtonSelector = `${storyBlockSelector} .docblock-code-toggle`;
    const codeBlockSelector = `${storyBlockSelector} code.language-jsx`;
    const body = iframeRef.current.contentDocument.body;

    const storyRootEl = body.querySelector(storyRootSelector);
    if (storyRootEl) {
      setHtmlCode(storyRootEl.innerHTML);
    } else {
      errorLoadingHtmlCode();
    }

    // Find the 'Show code' button and click it
    const showCodeButton = body.querySelector(codeButtonSelector);
    if (!(showCodeButton && (showCodeButton as HTMLButtonElement).click)) {
      errorLoadingReactCode();
      return;
    }
    (showCodeButton as HTMLButtonElement).click();

    // Read the code out of the resulting code block after waiting for it to be generated
    let retries = 0;
    const MAX_RETRIES = 3;
    function readCode() {
      setTimeout(() => {
        const codeEl = body.querySelector(codeBlockSelector);
        if (codeEl) {
          setReactCode(codeEl.outerHTML);
        } else if (retries < MAX_RETRIES) {
          retries++;
          readCode();
        } else {
          errorLoadingReactCode();
        }
      }, 1000);
    }
    readCode();
  };

  return (
    <div className="c-example-footer">
      <iframe
        referrerPolicy="no-referrer"
        src={iframeUrl}
        style={{ width: '0', height: '0', border: 'none' }}
        ref={iframeRef}
        loading="lazy"
        onLoad={onIframeLoad}
      />

      <CodeSnippet html={htmlCode} />
      <a
        href={makeStorybookUrl(storyId, theme)}
        target="_blank"
        rel="noreferrer"
        className="c-storybook-example__link"
      >
        Open in Storybook <ExternalLinkIcon />
      </a>
    </div>
  );
};

export default StorybookExampleFooter;
