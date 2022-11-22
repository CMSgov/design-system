import React from 'react';
type ThemeName = 'core' | 'healthcare' | 'medicare';

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
    return children;
  } else {
    return null;
  }
};

export default ThemeContent;
