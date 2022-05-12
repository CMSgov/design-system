import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';

const breakpointOpts = {
  xs: '360',
  sm: '544',
  md: '768',
  lg: '1024',
  xl: '1280',
};

interface ResponsiveExample {
  /**
   * id for storybook story to display
   */
  storyId: string;
  /**
   * Accessible text to describe iframe content
   */
  title: string;
}

/**
 * An example that includes breakpoints to mimic different screen sizes as well as an example
 */
const ResponsiveExample = ({ storyId, title }: ResponsiveExample) => {
  const [iframeBreakpoint, setIframeBreakpoint] = useState<string>('xl');
  const [iframeHeight, setiFrameHeight] = useState<number>(0);
  const [exampleWrapperWidth, setExampleWrapperWidth] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>();
  const exampleWrapperRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (window) {
      // on window resize, re-calculate the width of the wrapper
      window.addEventListener('resize', handleWindowResize);
    }
    handleWindowResize();

    const contentWindow = iframeRef.current.contentWindow;

    return () => {
      if (contentWindow) {
        contentWindow.removeEventListener('resize', handleIframeResize);
      }
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // get & set the width of the example wrapper
  const handleWindowResize = () => {
    if (exampleWrapperRef.current) {
      setExampleWrapperWidth(exampleWrapperRef.current.offsetWidth);
    }
  };

  // calculate the scale at which the example should be shown
  const getScale = () => {
    if (exampleWrapperRef.current) {
      return Math.min(1, exampleWrapperWidth / breakpointOpts[iframeBreakpoint]);
    }
  };

  // when the iframe content resizes, recalculate the height at which it should be shown
  const handleIframeResize = () => {
    if (iframeRef.current) {
      const height = iframeRef.current.contentDocument.body.offsetHeight;
      setiFrameHeight(height);
    }
  };

  // when the iframe's content loads, set up listener and calculate height of iframe
  const onIframeLoad = () => {
    if (iframeRef.current) {
      const contentWindow = iframeRef.current.contentWindow;
      contentWindow.addEventListener('resize', handleIframeResize);
      iframeRef.current.contentDocument.documentElement.classList.add('ds-u-overflow--hidden');
      handleIframeResize();
    }
  };

  return (
    <div className="c-responsive-example ds-u-border--1">
      <ol className="c-responsive-example__button-list ds-u-border-bottom--1 ds-l-row ds-u-margin--0 ds-u-padding-x--0">
        {Object.keys(breakpointOpts).map((breakpointName) => (
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
              <div className="ds-u-font-size--small">Width: {breakpointOpts[breakpointName]}</div>
            </button>
          </li>
        ))}
      </ol>
      <div
        className="c-resposive-example__example-wrapper "
        style={{ height: getScale() * iframeHeight }}
        ref={exampleWrapperRef}
      >
        <div
          className={`c-repsonsive-example__iframe-wrapper ${
            iframeBreakpoint && `c-responsive-example__iframe-wrapper--width-${iframeBreakpoint}`
          }`}
          style={{ transform: `scale(${getScale()})` }}
        >
          <iframe
            referrerPolicy="no-referrer"
            className={`c-responsive-example__iframe ${
              iframeBreakpoint && `c-responsive-example__iframe--width-${iframeBreakpoint}`
            }`}
            src={`../storybook/iframe.html?id=${storyId}&viewMode=story`}
            title={title}
            ref={iframeRef}
            onLoad={onIframeLoad}
            height={iframeHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default ResponsiveExample;
