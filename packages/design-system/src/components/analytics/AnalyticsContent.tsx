import React, { useEffect, useRef } from 'react';

export interface RenderToStringProps {
  children: string | React.ReactNode;
  onContentStringRendered: (stringContent: string) => any;
}

/**
 * For analytics, we often need to send a string version of the content that the user
 * is being shown. However, most of our content props allow for React nodes, which
 * must be rendered before it can be turned into a string. While there is an existing
 * function in `react-dom/server` that will render JSX components to strings, using
 * it here would add about 20KB to the bundle and would include html tags, which we
 * don't care about. This component renders content and sends a string back to the
 * parent through a callback.
 */
export const AnalyticsContent = (props: RenderToStringProps) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      props.onContentStringRendered(ref.current.textContent);
    }
  }, [props.children, props.onContentStringRendered]);

  return <React.Fragment ref={ref}>props.children</React.Fragment>;
};
