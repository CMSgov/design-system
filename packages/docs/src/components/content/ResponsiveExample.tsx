import React, { useLayoutEffect } from 'react';
import { useState, useRef, useEffect } from 'react';
import { withPrefix } from 'gatsby';
import classnames from 'classnames';
import StorybookExampleFooter from './StorybookExampleFooter';

// @TODO: grab these from tokens
const breakpoints = {
  xs: 360,
  sm: 544,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

const examplePadding = 16;

interface ResponsiveExample {
  /**
   * id for storybook story to display
   */
  storyId: string;
  /**
   * Accessible text to describe iframe content
   */
  title: string;
  /**
   * Current theme
   */
  theme: string;
}

/**
 * An example that includes breakpoints to mimic different screen sizes
 *
 * This uses a storybook story to display inner content and displays the html for the example
 *
 * To use this example, you must have a corresponding storybook story to reference
 */
const ResponsiveExample = ({ storyId, title, theme }: ResponsiveExample) => {
  const rootRef = useRef<HTMLDivElement>();
  const exampleWrapperRef = useRef<HTMLDivElement>();
  const [exampleWrapperWidth, setExampleWrapperWidth] = useState<number>(200);
  const [iframeBreakpoint, setIframeBreakpoint] = useState<keyof typeof breakpoints>('md');
  const [iframeHeight, setIFrameHeight] = useState<number>(200);
  const iframeRef = useRef<HTMLIFrameElement>();
  const iframeUrl = withPrefix(
    `/storybook/iframe.html?id=${storyId}&viewMode=story&globals=theme:${theme}`
  );

  const availableWidth = exampleWrapperWidth - 2 * examplePadding;
  const iframeWidth = breakpoints[iframeBreakpoint];
  const iframeScale = Math.min(1, availableWidth / iframeWidth);
  const exampleWrapperHeight = iframeHeight * iframeScale + 2 * examplePadding;

  function calcExampleWidth() {
    setTimeout(() => {
      if (rootRef.current) {
        setExampleWrapperWidth(rootRef.current.offsetWidth);
      }
    }, 50);
  }

  useEffect(calcExampleWidth, [rootRef.current]);

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', calcExampleWidth);
    }

    return () => {
      window.removeEventListener('resize', calcExampleWidth);
      // Remove resize listener set in the onIFrameLoad handler
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.removeEventListener('resize', handleIframeResize);
      }
    };
  }, []);

  // when the iframe content resizes, recalculate the height at which it should be shown
  const handleIframeResize = () => {
    if (iframeRef.current) {
      const height = iframeRef.current.contentDocument.body.offsetHeight;
      setIFrameHeight(height);
    }
  };

  // when the iframe's content loads, set up listener and calculate height of iframe
  const onIFrameLoad = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.addEventListener('resize', handleIframeResize);
      iframeRef.current.contentDocument.documentElement.classList.add('ds-u-overflow--hidden');
      handleIframeResize();
    }
  };

  return (
    <>
      <div className="c-responsive-example ds-u-border--1" ref={rootRef}>
        <ol className="c-responsive-example__button-list ds-u-border-bottom--1 ds-l-row ds-u-margin--0 ds-u-padding-x--0">
          {Object.keys(breakpoints).map((breakpointName: keyof typeof breakpoints) => (
            <li
              className="c-responsive-example__list-item ds-l-col ds-u-padding-x--0"
              key={`breakpoint-${breakpointName}`}
            >
              <button
                className={classnames('c-responsive-example__button', {
                  'c-responsive-example__button--active': breakpointName === iframeBreakpoint,
                })}
                onClick={() => setIframeBreakpoint(breakpointName)}
              >
                <strong>{breakpointName}</strong>
                <div className="ds-u-font-size--small">Width: {breakpoints[breakpointName]}</div>
              </button>
            </li>
          ))}
        </ol>
        <div
          className="c-responsive-example__example-wrapper "
          style={{ height: exampleWrapperHeight }}
          ref={exampleWrapperRef}
        >
          <iframe
            referrerPolicy="no-referrer"
            className={`c-responsive-example__iframe ${
              iframeBreakpoint && `c-responsive-example__iframe--width-${iframeBreakpoint}`
            }`}
            src={iframeUrl}
            title={title}
            ref={iframeRef}
            onLoad={onIFrameLoad}
            height={iframeHeight}
            width={iframeWidth}
            style={{ transform: `scale(${iframeScale})` }}
          />
          {iframeScale < 1 && (
            <div className="c-responsive-example__scale">Scale: {iframeScale.toFixed(2)}</div>
          )}
        </div>
      </div>
      <StorybookExampleFooter storyId={storyId} theme={theme} />
    </>
  );
};

export default ResponsiveExample;
