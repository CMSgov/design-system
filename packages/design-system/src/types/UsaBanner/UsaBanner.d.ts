import * as React from 'react';

export type LocaleLanguage = 'en' | 'es';

export interface UsaBannerProps {
  /**
   * Additional classes to be added to the root `section` element
   */
  className?: string;
  /**
   * A unique ID to be applied to the banner content. A unique ID will be generated if one isn't provided.
   */
  id?: string;
  /**
   * The language the USA Banner will be presented in.
   */
  locale?: LocaleLanguage,
}

export default class UsaBanner extends React.Component<UsaBannerProps, any> {
  render(): JSX.Element;
}
