import React, { useRef, useState } from 'react';
import { Button, ExternalLinkIcon } from '@cmsgov/design-system';
import { makeStorybookUrl } from '../helpers/urlUtils';
import { withPrefix } from 'gatsby';
import ExampleFooter from './ExampleFooter';

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
  const [htmlCode, setHtmlCode] = useState<string>('Loading...');
  const [reactCode, setReactCode] = useState<string>('Loading...');
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

    const normalizedStoryId = storyId.split('&')[0]; // Omit additional args
    const storyBlockSelector = `#anchor--${normalizedStoryId}`;
    const storyRootSelector = `#story--${normalizedStoryId}`;
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
      console.error(
        `Code button missing or invalid using this selector: '${codeButtonSelector}'`,
        showCodeButton
      );
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
          setReactCode(codeEl.innerHTML);
        } else if (retries < MAX_RETRIES) {
          retries++;
          readCode();
        } else {
          console.error(`Code block not found: ${codeBlockSelector}`, codeEl);
          errorLoadingReactCode();
        }
      }, 1000);
    }
    readCode();
  };

  const iframe = (
    <iframe
      className="c-storybook-example-footer__iframe"
      referrerPolicy="no-referrer"
      src={iframeUrl}
      ref={iframeRef}
      loading="lazy"
      onLoad={onIframeLoad}
    />
  );

  return (
    <div className="c-storybook-example-footer">
      {iframe}
      <ExampleFooter
        html={htmlCode}
        highlightedJsx={reactCode}
        sourceLink={
          <Button
            href={makeStorybookUrl(storyId, theme)}
            target="_blank"
            rel="noreferrer"
            variation="ghost"
            size="small"
          >
            Open in Storybook <ExternalLinkIcon className="ds-u-margin-left--1" />
          </Button>
        }
      />
    </div>
  );
};

export default StorybookExampleFooter;
