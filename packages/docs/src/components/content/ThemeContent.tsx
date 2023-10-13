import React from 'react';
import themes from '../../../../../themes.json';
type ThemeName = keyof typeof themes;

export interface ThemeContentProps {
  children: React.ReactElement;
  /**
   * One of the available theme names in lowercase as presented in ThemeNames
   */
  theme: string;
  /**
   * Only show content if the current theme is in this list
   */
  onlyThemes?: ThemeName[];
  /**
   * Never show content if the current theme is in this list
   */
  neverThemes?: ThemeName[];
}

/**
 * Conditionally renders content based on the current theme.
 *
 * Note that in order for markdown to be correctly rendered in the children of this component,
 * you need to have an empty line after the start tag and before the end tag for this component.
 */
const ThemeContent = (props: ThemeContentProps) => {
  const { children, theme, onlyThemes, neverThemes } = props;
  if (
    (onlyThemes && onlyThemes.includes(theme as ThemeName)) ||
    (neverThemes && !neverThemes.includes(theme as ThemeName))
  ) {
    // Must be wrapped in a div to match what we have in the else block below in order to
    // avoid elements not being matched correctly during rehydration
    return <div>{children}</div>;
  } else {
    // Hide the content that falls outside our theme conditions rather than not rendering it,
    // because not rendering it will cause rehydration problems in certain edge cases that
    // produce wild results.
    return <div hidden>{children}</div>;
  }
};

export default ThemeContent;
