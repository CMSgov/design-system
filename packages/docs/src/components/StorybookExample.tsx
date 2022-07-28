import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { ExternalLinkIcon, Spinner } from '@cmsgov/design-system';
import { withPrefix } from 'gatsby';
import CodeSnippet from './CodeSnippet';
import { makeStorybookUrl } from '../helpers/urlUtils';

interface StorybookExampleProps {
  /**
   * name of component. Never displayed, but used for accessible labelling. Make sure this is unique on the page
   */
  componentName: string;
  /**
   * min height of example container. Use for examples that have elements appear on interactivity that need more room
   */
  minHeight?: number;
  /**
   * story id from storybook url
   * example: `components-[COMPONENT_NAME]--default`
   */
  storyId: string;
  /**
   * path within 'src' directory to source file
   */
  sourceFilePath?: string;
  /**
   * package where the source comes from
   */
  sourcePackageName?: string;
  /**
   * If set, does not show an option for showing React source
   */
  hideReactSource?: boolean;
  /**
   * If set, does not show an option for showing HTML source
   */
  hideHtmlSource?: boolean;
  /**
   * Current theme
   */
  theme: string;
}

/**
 * An example to display storybook stories with markup that the story generates
 * This is mainly used on component pages
 *
 * If you need to show responsiveness, use the `ResponsiveExample`.
 * If you don't need a story, but can use regular HTML or React components, use an Embedded example.
 */
const StorybookExample = ({
  theme,
  componentName,
  minHeight,
  sourceFilePath,
  sourcePackageName,
  hideReactSource,
  hideHtmlSource,
  storyId,
}: StorybookExampleProps) => {
  const [iframeHeight, setiFrameHeight] = useState<number>(200);
  const [iframeHtml, setiFrameHtml] = useState<string>('');
  const [reactCode, setReactCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>();
  const iframeUrl = withPrefix(
    `/storybook/iframe.html?id=${storyId}&viewMode=story&globals=theme:${theme}`
  );
  const docsRef = useRef<HTMLIFrameElement>();
  const docsUrl = withPrefix(
    `/storybook/iframe.html?id=${storyId}&viewMode=docs&globals=theme:${theme}`
  );

  useEffect(() => {
    if (window) {
      // when window resizes, recalculate the height of the iframe
      window.addEventListener('resize', setIframeHeight);
    }

    return () => {
      if (window) {
        window.removeEventListener('resize', setIframeHeight);
      }
    };
  });

  // when the iframe content resizes, recalculate the height at which it should be shown
  const setIframeHeight = () => {
    if (iframeRef.current) {
      const height = iframeRef.current.contentDocument.body.offsetHeight;
      setiFrameHeight(height);
    }
  };

  // when the iframe's content loads, calculate height of iframe & set html
  const onIframeLoad = () => {
    if (iframeRef.current) {
      setIframeHeight();

      const rootEl = iframeRef.current.contentDocument.body.querySelector('#root');
      if (rootEl) {
        setiFrameHtml(rootEl.innerHTML);
      }
    }

    setIsLoading(false);
  };

  const onDocsIframeLoad = () => {
    const printError = () => setReactCode('Error loading React source');

    if (!docsRef.current) {
      printError();
      return;
    }

    const storyBlockSelector = `#anchor--${storyId}`;
    const codeButtonSelector = `${storyBlockSelector} .docblock-code-toggle`;
    const codeBlockSelector = `${storyBlockSelector} code.language-jsx`;
    const body = docsRef.current.contentDocument.body;

    // Find the 'Show code' button and click it
    const showCodeButton = body.querySelector(codeButtonSelector);
    if (!(showCodeButton && (showCodeButton as HTMLButtonElement).click)) {
      printError();
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
          printError();
        }
      }, 1000);
    }
    readCode();
  };

  return (
    <>
      <div className="c-storybook-example">
        <div
          className={classnames('c-storybook-example__iframe-wrapper', {
            'ds-u-padding-y--4': isLoading,
            'ds-u-text-align--center': isLoading,
          })}
          style={{
            height: iframeHeight,
            minHeight: minHeight || 0,
          }}
        >
          {isLoading && <Spinner />}
          <iframe
            referrerPolicy="no-referrer"
            src={iframeUrl}
            id={`${componentName}-example`}
            className="c-storybook-example__iframe"
            title={`${componentName} example`}
            ref={iframeRef}
            loading="lazy"
            onLoad={onIframeLoad}
          />
          {hideReactSource && (
            <iframe
              referrerPolicy="no-referrer"
              src={docsUrl}
              style={{ width: '0', height: '0', border: 'none' }}
              ref={docsRef}
              loading="lazy"
              onLoad={onDocsIframeLoad}
            />
          )}
        </div>
        <div className="ds-u-display--flex ds-u-justify-content--end">
          <a
            href={makeStorybookUrl(storyId, theme)}
            target="_blank"
            rel="noreferrer"
            className="c-storybook-example__link"
          >
            Open in Storybook <ExternalLinkIcon />
          </a>
        </div>
      </div>
      <pre
        className="ds-u-margin-bottom--4 ds-u-overflow--auto ds-u-padding--2"
        dangerouslySetInnerHTML={{ __html: reactCode }}
      ></pre>
      <CodeSnippet html={iframeHtml} />
    </>
  );
};

export default StorybookExample;
