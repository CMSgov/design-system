import * as React from 'react';

/**
 * Displays the active theme label based on the `theme` query parameter in the URL.
 */
const ThemeLabel = () => {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const theme = params.get('theme')?.toLowerCase();

  let label = 'Core';
  switch (theme) {
    case 'healthcare':
      label = 'Healthcare';
      break;
    case 'medicare':
      label = 'Medicare';
      break;
    case 'cmsgov':
      label = 'CMS';
      break;
  }

  return <>{label}</>;
};

export default ThemeLabel;
