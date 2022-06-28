import React from 'react';

type ThemeName = 'core' | 'healthcare' | 'medicare';

interface CommonThemeContentProps {
  children: React.ReactElement;
  /**
   * One of the availabe theme names in lowercase as presented in ThemeNames
   */
  theme: ThemeName;
}

export interface OnlyThemeContentProps extends CommonThemeContentProps {
  /**
   * Only show content if the current theme is in this list
   */
  onlyThemes: ThemeName[];
}

export interface NeverThemeContentProps extends CommonThemeContentProps {
  /**
   * Never show content if the current theme is in this list
   */
  neverThemes: ThemeName[];
}

export type ThemeContentProps = OnlyThemeContentProps | NeverThemeContentProps;

/**
 * Conditionally renders content based on the current theme.
 *
 * Note that in order for markdown to be correctly rendered in the children of this component,
 * you need to have an emtpy line after the start tag and before the end tag for this component.
 */
const ThemeContent = (props: ThemeContentProps) => {
  const { children, theme } = props;
  const { onlyThemes } = props as OnlyThemeContentProps;
  const { neverThemes } = props as NeverThemeContentProps;
  if ((onlyThemes && onlyThemes.includes(theme)) || (neverThemes && !neverThemes.includes(theme))) {
    return children;
  } else {
    return null;
  }
};

export default ThemeContent;
