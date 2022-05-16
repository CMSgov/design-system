import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { ExternalLinkIcon, Spinner } from '@cmsgov/design-system';
import CodeSnippet from './CodeSnippet';
import { withPrefix } from 'gatsby';

interface StorybookExampleProps {
  /**
   * name of component
   */
  componentName: string;
  /**
   * path within 'src' directory to source file
   */
  sourceFilePath?: string;
}

/**
 * An example to display storybook stories with markup that the story generates
 * This is mainly used on component pages
 *
 * If you need to show responsiveness, use the `ResponsiveExample`.
 * If you don't need a story, but can use regular HTML or React components, use an Embedded example.
 */
const StorybookExample = ({ componentName, sourceFilePath }: StorybookExampleProps) => {
  const [iframeHeight, setiFrameHeight] = useState<number>(200);
  const [iframeHtml, setiFrameHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>();
  const iframeUrl = withPrefix(
    `/storybook/iframe.html?id=components-${componentName}--default&args=&viewMode=story`
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

  return (
    <>
      {sourceFilePath && (
        <p>
          <a
            href={`https://github.com/CMSgov/design-system/blob/master/packages/design-system/src/${sourceFilePath}`}
          >
            View Source File
          </a>
        </p>
      )}
      <div className="c-storybook-example">
        <div
          className={classnames('c-storybook-example__iframe-wrapper', {
            'ds-u-padding-y--4': isLoading,
            'ds-u-text-align--center': isLoading,
          })}
          style={{ height: iframeHeight }}
        >
          {isLoading && <Spinner />}
          <iframe
            referrerPolicy="no-referrer"
            src={iframeUrl}
            id={`${componentName}-example`}
            className="c-storybook-example__iframe"
            title={`${componentName} example`}
            ref={iframeRef}
            onLoad={onIframeLoad}
            height={iframeHeight}
          />
        </div>
        <div className="ds-u-display--flex ds-u-justify-content--end">
          <a
            href={`/storybook/?path=/story/components-${componentName}--default`}
            target="_blank"
            rel="noreferrer"
            className="c-storybook-example__link"
          >
            Open in Storybook <ExternalLinkIcon />
          </a>
        </div>
      </div>
      <CodeSnippet html={iframeHtml} />
    </>
  );
};

export default StorybookExample;
