import * as React from 'react';

export type LocaleLanguage = 'en' | 'es';

export interface UsaBannerProps {
  /**
   * The language the USA Banner will render as.
   */
  locale?: LocaleLanguage,
}

export default class UsaBanner extends React.Component<UsaBannerProps, any> {
  render(): JSX.Element;
}
