import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import StorybookExampleFooter from './StorybookExampleFooter';
import { Spinner } from '@cmsgov/design-system';
import { withPrefix } from 'gatsby';
import { clientOnly } from '../../helpers/clientOnly';

interface StorybookExampleProps {
  /**
   * name of component. Never displayed, but used for accessible labelling. Make sure this is unique on the page
   */
  componentName: string;
  /**
   * optional values supplied to alter controls on the story.
   */
  controls?: string;
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
  storyId,
  controls,
}: StorybookExampleProps) => {
  const [iframeHeight, setiFrameHeight] = useState<number>(200);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const controlArgs = controls ? `&args=${controls}` : '';
  const iframeUrl = withPrefix(
    `/storybook/iframe.html?id=${storyId}${controlArgs}&viewMode=story&globals=theme:${theme}`
  );

  useEffect(() => {
    if (window) {
      // when window resizes, recalculate the height of the iframe
      window.addEventListener('resize', updateIframeHeight);

      return () => {
        window.removeEventListener('resize', updateIframeHeight);
      };
    }
  }, []);

  /**
   * Calculate the new height of the iframe based on the content resizes.
   * Returns true if it detects height and resizes.
   */
  const updateIframeHeight = () => {
    const height = iframeRef?.current.contentDocument.body.offsetHeight;
    if (height > 0) {
      setiFrameHeight(height);
      return true;
    }
    return false;
  };

  // when the iframe's content loads, calculate height of iframe & set html
  const onIframeLoad = () => {
    const attemptToUpdateHeight = (millisecondsWaited = 0) => {
      if (updateIframeHeight()) {
        // Job well done
        return;
      }

      if (millisecondsWaited > 2000) {
        console.error(`Timed out waiting for content from ${iframeUrl} to have readable height`);
      } else {
        setTimeout(() => attemptToUpdateHeight(millisecondsWaited + 200), 200);
      }
    };

    attemptToUpdateHeight();
    setIsLoading(false);
  };

  return (
    <>
      <section className="c-storybook-example">
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
        </div>
      </section>
      <StorybookExampleFooter storyId={storyId} theme={theme} />
    </>
  );
};

export default clientOnly(StorybookExample);
