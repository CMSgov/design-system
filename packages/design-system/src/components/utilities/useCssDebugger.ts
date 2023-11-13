import { useEffect } from 'react';

// `--debugger` is a CSS var that, when set to `true`,
// will visually show all soon-to-be-deprecated elements
// in use on a page.

// This hook will set `--debugger` to `true` if the env is not PROD
// and if the CSS var is not already set in an application.

export const useCssDebugger = () => {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' &&
      getComputedStyle(document.documentElement).getPropertyValue('--debugger').length === 0
    ) {
      document.documentElement.style.setProperty('--debugger', 'true');
    }
  }, []);
};

export default useCssDebugger;
