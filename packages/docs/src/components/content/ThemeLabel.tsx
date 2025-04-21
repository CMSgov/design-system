import * as React from 'react';
import useTheme from '../../helpers/useTheme';

/**
 * Displays the active theme label based on the `theme` query parameter in the URL.
 */
const ThemeLabel = () => {
  const theme = useTheme();

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
